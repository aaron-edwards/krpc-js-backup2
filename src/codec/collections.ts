import {
  List,
  Set as ProtoSet,
  Tuple,
  Dictionary,
  DictionaryEntry,
} from "../generated/proto/krpc";
import { ServiceMap } from "../types";

import { Encode, Decode, IType } from "./types";

export const encodeList = (
  value: any[],
  { types = [] }: IType,
  serviceMap: ServiceMap,
  encode: Encode
) => {
  const encodeItem = (item: any) => encode(item, types[0], serviceMap, encode);
  const items = value.map(encodeItem);
  return List.encode({ items }).finish();
};

export const decodeList = (
  buffer: Uint8Array,
  { types = [] }: IType,
  serviceMap: ServiceMap,
  decode: Decode
) => {
  const decodeItem = (element: Uint8Array) =>
    decode(element, types[0], serviceMap, decode);
  return List.decode(buffer).items.map(decodeItem);
};

export const encodeSet = (
  value: Set<any>,
  { types = [] }: IType,
  serviceMap: ServiceMap,
  encode: Encode
) => {
  const encodeItem = (item: any) => encode(item, types[0], serviceMap, encode);
  const items = [...value].map(encodeItem);
  return ProtoSet.encode({ items }).finish();
};

export const decodeSet = (
  buffer: Uint8Array,
  { types = [] }: IType,
  serviceMap: ServiceMap,
  decode: Decode
) => {
  const decodeItem = (element: Uint8Array) =>
    decode(element, types[0], serviceMap, decode);
  return new Set(ProtoSet.decode(buffer).items.map(decodeItem));
};

export const encodeTuple = (
  value: any[],
  { types }: IType,
  serviceMap: ServiceMap,
  encode: Encode
) => {
  const items = value.map((el, index) =>
    encode(el, types![index], serviceMap, encode)
  );
  return Tuple.encode({ items }).finish();
};

export const decodeTuple = (
  buffer: Uint8Array,
  { types }: IType,
  serviceMap: ServiceMap,
  decode: Decode
) =>
  Tuple.decode(buffer).items.map((el, index) =>
    decode(el, types![index], serviceMap, decode)
  );

export const encodeDictionary = (
  value: {},
  { types: [keyType, valueType] = [] }: IType,
  serviceMap: ServiceMap,
  encode: Encode
) => {
  const encodeEntry = ([key, val]: any[]) => ({
    key: encode(key, keyType, serviceMap, encode),
    value: encode(val, valueType, serviceMap, encode),
  });

  const entries = Object.entries(value)
    .map(encodeEntry)
    .map(DictionaryEntry.fromPartial);

  return Dictionary.encode({ entries }).finish();
};

export const decodeDictionary = (
  buffer: Uint8Array,
  { types: [keyType, valueType] = [] }: IType,
  serviceMap: ServiceMap,
  decode: Decode
) =>
  Object.fromEntries(
    Dictionary.decode(buffer).entries.map(({ key, value }) => [
      decode(key!, keyType, serviceMap, decode),
      decode(value!, valueType, serviceMap, decode),
    ])
  );
