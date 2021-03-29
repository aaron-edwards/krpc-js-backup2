import {
  Service,
  DeepPartial,
  Type_TypeCode as TypeCode,
  Type,
  Enumeration,
} from "../../../src/generated/proto/krpc";

import createDoc from "./create-doc";
import createProcedure from "./create-procedure";
import createClass from "./create-class";

type IType = DeepPartial<Type>;
type IService = DeepPartial<Service>;
type IEnumeration = DeepPartial<Enumeration>;

const doubleTypes = [TypeCode.SINT64, TypeCode.UINT64];
const protoTypes = [
  TypeCode.EVENT,
  TypeCode.PROCEDURE_CALL,
  TypeCode.STREAM,
  TypeCode.STATUS,
  TypeCode.SERVICES,
];

const getImports = (serviceName: string, types: IType[]) => [
  ...new Set(
    types
      .filter((t) => t && t!.service && t!.service !== serviceName)
      .map((t) => t!.service!)
  ),
];

export default (service: IService) => {
  const classNames = service.classes?.map((c) => c.name!) || [];
  const anonProcs =
    service.procedures?.filter(
      (p) => classNames.find((cn) => p.name!.startsWith(cn)) === undefined
    ) || [];
  const mapEnums = (e: IEnumeration) => ({
    name: e.name!,
    values: e.values!.map(({ name }) => ({ name: name! })),
    documentation: createDoc(e),
  });
  const classes = service.classes?.map((c) => createClass(c, service)) || [];
  const allTypes = [
    ...new Set(
      (
        service.procedures?.flatMap((p) => [
          ...(p.parameters?.map((param) => param.type) || []),
          p.returnType,
        ]) || []
      ).filter((t) => t)
    ),
  ] as IType[];
  return {
    name: service.name!,
    documentation: createDoc(service),
    enumerations: service.enumerations?.map(mapEnums) || [],
    imports: getImports(service.name!, allTypes),
    importLong: !!allTypes.find((t) => doubleTypes.includes(t.code!!)),
    importProto: !!allTypes.find((t) => protoTypes.includes(t.code!!)),
    classes,
    procedures: anonProcs.map((p) => createProcedure(p, service.name!)),
  };
};
