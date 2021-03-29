import { DeepPartial, Procedure } from "../../../src/generated/proto/krpc";
import { createFunctionName } from "../../../src/services/builder/builder-utils";

import mapType from "./create-type";
import mapDoc from "./create-doc";

type IProcedure = DeepPartial<Procedure>;

const isStatic = ({ name }: IProcedure) => name!.includes("static_");

const safeNames = {
  function: "func",
  class: "cls",
} as { [key: string]: string };

const nameReplacer = (name: string) => {
  const safeName = safeNames[name];
  return safeName || name;
};

export default (
  procDef: IProcedure,
  serviceName: string,
  className?: string
) => {
  const funcName = createFunctionName(procDef.name!, className);

  const returnType = procDef.returnType
    ? mapType(procDef.returnType, serviceName, true)
    : "void";

  const params = (procDef.parameters || [])
    .filter((p) => p.name! !== "this")
    .map((p) => ({
      name: nameReplacer(p.name!),
      type: mapType(p.type!, serviceName, false),
      default: !!(p.defaultValue && p.defaultValue.length > 0),
    }));
  return {
    funcName,
    returnType: `Promise<${returnType}>`,
    params,
    static: isStatic(procDef),
    documentation: mapDoc(procDef),
  };
};
