import { Socket } from "net";

import { Writer, Reader } from "protobufjs/minimal";

import {
  ConnectionRequest,
  ConnectionResponse,
  ConnectionResponse_Status,
  Request,
  Response,
} from "../generated/proto/krpc";

export async function* socketIterator(
  socket: Socket
): AsyncGenerator<Response, null, null> {
  let reader: Reader | undefined;
  let length: number | undefined;

  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of socket) {
    if (reader) {
      reader = Reader.create(
        Buffer.concat([reader.buf.slice(reader.pos), chunk])
      );
    } else {
      reader = Reader.create(chunk);
    }

    let done = false;
    while (!done) {
      length = length || reader.uint32();
      if (length + reader.pos > reader.len) {
        done = true;
      } else {
        const buffer = (<Uint8Array>reader.buf).slice(
          reader.pos,
          reader.pos + length
        );
        reader.skip(length);
        length = undefined;
        yield Response.decode(buffer);
        done = reader.pos >= reader.len;
      }
    }
  }
  return null;
}

export class TcpRpcClient {
  private socket: Socket;

  private name: string;

  private host: string;

  private port: number;

  private reader?: AsyncGenerator<Response, null, null>;

  constructor(host: string, port: number, name: string) {
    this.host = host;
    this.port = port;
    this.name = name;
    this.socket = new Socket({
      readable: true,
      writable: true,
      allowHalfOpen: true,
    });
  }

  public async connect() {
    return new Promise<ConnectionResponse>((resolve, reject) => {
      this.socket.connect({ port: this.port, host: this.host }, () => {
        const request = ConnectionRequest.encode(
          ConnectionRequest.fromPartial({
            clientName: this.name,
          })
        ).finish();

        this.socket.write(Writer.create().bytes(request).finish());

        this.socket.once("data", (d) => {
          this.reader = socketIterator(this.socket);
          const response = ConnectionResponse.decode(Reader.create(d).bytes());
          if (response.status === ConnectionResponse_Status.OK) {
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    });
  }

  public async close() {
    return new Promise<void>((res) => {
      this.reader = undefined;
      this.socket.end(() => res());
    });
  }

  public async getServices() {
    if (!this.reader) {
      throw new Error("RpcClient is not connected");
    }
    const request = Request.fromPartial({
      calls: [...new Array(100)].map(() => ({
        service: "KRPC",
        procedure: "GetStatus",
      })),
    });
    this.socket.write(
      Writer.create().bytes(Request.encode(request).finish()).finish()
    );

    const res = await this.reader.next();
    return res?.value;
  }
}
