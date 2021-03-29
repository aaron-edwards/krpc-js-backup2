import { Socket } from "net";

import { Writer } from "protobufjs";

import * as proto from "../generated/proto/krpc";

import tpcSocketIterator from "./TpcSocketIterator";

const toErrorString = ({ name, service, description }: proto.Error) =>
  `Krpc error ${JSON.stringify({ name, service, description })}`;

type ConnectionOptions = {
  host: string;
  port: number;
  name: string;
};

type Call<T> = {
  request: proto.ProcedureCall;
  decode: (data: Uint8Array) => T;
};

export default class RcpClient {
  private connectionOptions: ConnectionOptions;

  private socket: Socket;

  private responseIterator: AsyncGenerator<Uint8Array>;

  constructor(connectionOptions: ConnectionOptions) {
    this.connectionOptions = connectionOptions;
    this.socket = new Socket({ allowHalfOpen: true });
    this.responseIterator = tpcSocketIterator(this.socket);
  }

  connect(): Promise<proto.ConnectionResponse> {
    return new Promise<proto.ConnectionResponse>((resolve, reject) => {
      this.socket.connect(this.connectionOptions, async () => {
        const request = proto.ConnectionRequest.fromPartial({
          type: proto.ConnectionRequest_Type.RPC,
          clientName: this.connectionOptions.name,
        });
        this.write(proto.ConnectionRequest.encode(request).finish());
        const { value } = await this.responseIterator.next();
        const response = proto.ConnectionResponse.decode(value);
        if (response.status === proto.ConnectionResponse_Status.OK) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  close(): Promise<void> {
    return new Promise<void>((res) => this.socket.end(() => res()));
  }

  private write(message: Uint8Array) {
    this.socket.write(new Writer().bytes(message).finish());
  }

  sendRequest<A>(call: Call<A>): Promise<A>;
  sendRequest<A, B>(calla: Call<A>, callb: Call<B>): Promise<[A, B]>;
  sendRequest<A, B, C>(
    calla: Call<A>,
    callb: Call<B>,
    callc: Call<C>
  ): Promise<[A, B, C]>;
  sendRequest<A, B, C, D>(
    calla: Call<A>,
    callb: Call<B>,
    callc: Call<C>,
    calld: Call<D>
  ): Promise<[A, B, C, D]>;
  sendRequest<A, B, C, D, E>(
    calla: Call<A>,
    callb: Call<B>,
    callc: Call<C>,
    calld: Call<D>,
    calle: Call<E>
  ): Promise<[A, B, C, D, E]>;
  async sendRequest(...calls: Call<any>[]): Promise<any[]> {
    this.write(
      proto.Request.encode({ calls: calls.map((c) => c.request) }).finish()
    );
    const { value } = await this.responseIterator.next();
    const response = proto.Response.decode(value);
    if (response.error) {
      throw new Error(toErrorString(response.error));
    }
    const responseError = response.results.map((r) => r.error).filter((e) => e);
    if (responseError.length > 0) {
      throw new Error(
        (responseError as proto.Error[]).map(toErrorString).join("\n")
      );
    }

    if (calls.length === 1) {
      return calls[0].decode(response.results[0].value);
    }

    return calls.map(({ decode }, idx) => decode(response.results[idx].value));
  }
}
