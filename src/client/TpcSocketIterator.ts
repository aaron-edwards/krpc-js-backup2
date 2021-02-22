import { Socket } from "net";

import { Reader } from "protobufjs/minimal";

import { Response } from "../generated/proto/krpc";

export default async function* socketIterator(
  socket: Socket
): AsyncGenerator<Response, undefined, null> {
  let reader = Reader.create(Buffer.from([]));
  let length: number | undefined;

  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of socket) {
    reader = Reader.create(
      Buffer.concat([reader.buf.slice(reader.pos), chunk])
    );

    while (reader.pos < reader.len) {
      length = length || reader.uint32();
      if (length + reader.pos > reader.len) {
        break;
      } else {
        const buffer = reader.buf.slice(reader.pos, reader.pos + length);
        reader.skip(length);
        length = undefined;
        yield Response.decode(buffer);
      }
    }
  }
  return undefined;
}
