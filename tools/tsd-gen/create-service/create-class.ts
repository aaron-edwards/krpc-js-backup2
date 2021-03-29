import {
  DeepPartial,
  Service,
  Class,
  Procedure,
} from "../../../src/generated/proto/krpc";

import createDoc from "./create-doc";
import createProceduere from "./create-procedure";

type IClass = DeepPartial<Class>;
type IService = DeepPartial<Service>;
type IProcedure = DeepPartial<Procedure>;

const isFromClass = (className: string) => (proc: IProcedure) =>
  proc.name!.startsWith(`${className}_`);

export default (clazz: IClass, service: IService) => {
  const name = clazz.name || "";
  const procedures = (service.procedures || [])
    .filter(isFromClass(name))
    .map((p) => createProceduere(p, service.name!, clazz.name!));

  return {
    name,
    documentation: createDoc(clazz),
    procedures,
  };
};
