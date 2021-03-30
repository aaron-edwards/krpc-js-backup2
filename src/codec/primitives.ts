import ProtoBuf from "protobufjs";

type Primitive =
  | "double"
  | "float"
  | "sint32"
  | "sint64"
  | "uint32"
  | "uint64"
  | "bool"
  | "string"
  | "bytes";

export const decodePrimitive = (type: Primitive) => (value: Uint8Array) =>
  ProtoBuf.Reader.create(value)[type]();

export const encodePrimitive = (type: Primitive) => (value: any) =>
  ProtoBuf.Writer.create()
    [type](value as never)
    .finish();
