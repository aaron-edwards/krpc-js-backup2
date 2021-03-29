import {
  DeepPartial,
  Type,
  Type_TypeCode as TypeCode,
} from "../../../src/generated/proto/krpc";

type IType = DeepPartial<Type>;

const createNamedEntity = (type: IType, serviceName: string) =>
  `${serviceName === type.service ? "" : `${type.service}.`}${type.name}`;

const types = {
  [TypeCode.DOUBLE]: () => "number",
  [TypeCode.FLOAT]: () => "number",
  [TypeCode.SINT32]: () => "number",
  [TypeCode.SINT64]: (_a, _b, isReturn) =>
    isReturn ? "Long" : "number | Long",
  [TypeCode.UINT32]: () => "number",
  [TypeCode.UINT64]: (_a, _b, isReturn) =>
    isReturn ? "Long" : "number | Long",
  [TypeCode.STRING]: () => "string",
  [TypeCode.BOOL]: () => "boolean",
  [TypeCode.BYTES]: () => "Uint8Array",

  [TypeCode.EVENT]: () => "proto.Event",
  [TypeCode.PROCEDURE_CALL]: () => "proto.ProcedureCall",
  [TypeCode.STREAM]: () => "proto.Stream",
  [TypeCode.STATUS]: () => "proto.Status",
  [TypeCode.SERVICES]: () => "proto.Services",

  [TypeCode.ENUMERATION]: createNamedEntity,
  [TypeCode.CLASS]: createNamedEntity,
} as {
  [code: number]: (
    type: IType,
    serviceName: string,
    isReturn: boolean
  ) => string;
};

const createType = (
  type: DeepPartial<Type>,
  serviceName: string,
  isReturn: boolean
) => {
  const mappingFunc = types[type.code!];
  if (mappingFunc) {
    return mappingFunc(type, serviceName, isReturn);
  }
  // eslint-disable-next-line no-console
  console.warn(`No type mapped to typecode ${type.code} and name ${type.name}`);
  return "any";
};

types[TypeCode.LIST] = (type: IType, serviceName: string, isReturn: boolean) =>
  `${createType(type.types![0], serviceName, isReturn)}[]`;

types[TypeCode.TUPLE] = (type: IType, serviceName: string, isReturn: boolean) =>
  `[${type
    .types!.map((t) => createType(t, serviceName, isReturn))
    .join(", ")}]`;

types[TypeCode.SET] = (type: IType, serviceName: string, isReturn: boolean) =>
  `Set<${createType(type.types![0], serviceName, isReturn)}>`;

types[TypeCode.DICTIONARY] = (
  type: IType,
  serviceName: string,
  isReturn: boolean
) =>
  `{ [key: ${createType(type.types![0], serviceName, isReturn)}]: ${createType(
    type.types![1],
    serviceName,
    isReturn
  )} }`;

export default createType;
export type CreateType = typeof createType;
