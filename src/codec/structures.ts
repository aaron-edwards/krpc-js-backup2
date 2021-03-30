import { ServiceMap } from "../types";

import { encodePrimitive, decodePrimitive } from "./primitives";
import { IType } from "./types";

const encodeInt = encodePrimitive("sint32");
const decodeInt = decodePrimitive("sint32");

export const encodeEnum = (
  value: string,
  type: IType,
  serviceMap: ServiceMap
) => {
  const enumValues = serviceMap[type.service!].enums[type.name!];
  const index = enumValues.findIndex((v) => v === value);
  return encodeInt(index);
};

export const decodeEnum = (
  buffer: Uint8Array,
  type: IType,
  serviceMap: ServiceMap
) => {
  const index = decodeInt(buffer) as number;
  return serviceMap[type.service!].enums[type.name!][index];
};

export const encodeClass = (value: { id: Long }) =>
  encodePrimitive("uint64")(value.id);

export const decodeClass = (
  buffer: Uint8Array,
  type: IType,
  typeMap: ServiceMap
) => {
  const id = decodePrimitive("uint64")(buffer) as Long;
  return new typeMap[type.service!].classes[type.name!](id);
};
