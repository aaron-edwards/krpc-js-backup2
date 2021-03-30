import { ServiceMap } from "../types";
import { Type_TypeCode as TypeCodes } from "../generated/proto/krpc";

import { decodePrimitive, encodePrimitive } from "./primitives";
import * as collections from "./collections";
import { Encode, Decode, IType } from "./types";

const encoders = {
  [TypeCodes.DOUBLE]: encodePrimitive("double"),
  [TypeCodes.FLOAT]: encodePrimitive("float"),
  [TypeCodes.SINT32]: encodePrimitive("sint32"),
  [TypeCodes.SINT64]: encodePrimitive("sint64"),
  [TypeCodes.UINT32]: encodePrimitive("uint32"),
  [TypeCodes.UINT64]: encodePrimitive("uint64"),
  [TypeCodes.BOOL]: encodePrimitive("bool"),
  [TypeCodes.STRING]: encodePrimitive("string"),
  [TypeCodes.BYTES]: encodePrimitive("bytes"),

  // [TypeCodes.ENUMERATION]: structures.encodeEnum,
  // [TypeCodes.CLASS]: structures.encodeClass,

  // [TypeCodes.EVENT]: structures.encodeKrpcType("Event"),
  // [TypeCodes.STREAM]: structures.encodeKrpcType("Stream"),
  // [TypeCodes.PROCEDURE_CALL]: structures.encodeKrpcType("ProcedureCall"),
  // [TypeCodes.STATUS]: structures.encodeKrpcType("Status"),
  // [TypeCodes.SERVICES]: structures.encodeKrpcType("Services"),

  [TypeCodes.LIST]: collections.encodeList,
  [TypeCodes.SET]: collections.encodeSet,
  [TypeCodes.TUPLE]: collections.encodeTuple,
  [TypeCodes.DICTIONARY]: collections.encodeDictionary,
} as { [x: number]: Encode };

export const encode = (value: any, type: IType, serviceMap: ServiceMap) => {
  const encoder = encoders[type.code!];
  if (encoder) {
    return encoder(value, type, serviceMap, encode);
  }
  // eslint-disable-next-line no-console
  console.warn(
    `No encoder found for type with typecode of ${type.code} and name ${type.name}`
  );
  return undefined;
};

const decoders = {
  [TypeCodes.DOUBLE]: decodePrimitive("double"),
  [TypeCodes.FLOAT]: decodePrimitive("float"),
  [TypeCodes.SINT32]: decodePrimitive("sint32"),
  [TypeCodes.SINT64]: decodePrimitive("sint64"),
  [TypeCodes.UINT32]: decodePrimitive("uint32"),
  [TypeCodes.UINT64]: decodePrimitive("uint64"),
  [TypeCodes.BOOL]: decodePrimitive("bool"),
  [TypeCodes.STRING]: decodePrimitive("string"),
  [TypeCodes.BYTES]: decodePrimitive("bytes"),

  // [TypeCodes.ENUMERATION]: structures.decodeEnum,
  // [TypeCodes.CLASS]: structures.decodeClass,

  // [TypeCodes.EVENT]: structures.decodeKrpcType("Event"),
  // [TypeCodes.STREAM]: structures.decodeKrpcType("Stream"),
  // [TypeCodes.PROCEDURE_CALL]: structures.decodeKrpcType("ProcedureCall"),
  // [TypeCodes.STATUS]: structures.decodeKrpcType("Status"),
  // [TypeCodes.SERVICES]: structures.decodeKrpcType("Services"),

  [TypeCodes.LIST]: collections.decodeList,
  [TypeCodes.SET]: collections.decodeSet,
  [TypeCodes.TUPLE]: collections.decodeTuple,
  [TypeCodes.DICTIONARY]: collections.decodeDictionary,
} as { [x: number]: Decode };

export const decode = (
  buffer: Uint8Array,
  type: IType,
  serviceMap: ServiceMap
) => {
  const decoder = decoders[type.code!];
  if (decoder) {
    return decoder(buffer, type, serviceMap, decode);
  }
  // eslint-disable-next-line no-console
  console.warn(
    `No decoder found for type with typecode of ${type.code} and name ${type.name}`
  );
  return undefined;
};
