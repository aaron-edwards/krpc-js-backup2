export type ParsedEnum = {
  name: string;
  documentation: string[];
  values: { name: string }[];
};
export type ParsedParam = {
  name: string;
  type: string;
  default: boolean;
};
export type ParsedProcedure = {
  funcName: string;
  documentation: string[];
  params: ParsedParam[];
  returnType: string;
  static: boolean;
};
export type ParsedClass = {
  name: string;
  procedures: ParsedProcedure[];
  documentation: string[];
};
export type ParsedService = {
  name: string;
  imports: string[];
  documentation: string[];
  classes: ParsedClass[];
  procedures: ParsedProcedure[];
  enumerations: ParsedEnum[];
};
