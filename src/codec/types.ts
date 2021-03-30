import { ServiceMap } from "../types";
import { DeepPartial, Type } from "../generated/proto/krpc";

export type IType = DeepPartial<Type>;

export type Encode = (
  value: any,
  type: IType,
  serviceMap: ServiceMap,
  encode: Encode
) => Buffer | Uint8Array;

export type Decode = (
  buffer: Uint8Array,
  type: IType,
  serviceMap: ServiceMap,
  decode: Decode
) => any;
