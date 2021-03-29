import createType from "../create-type";
import { Type_TypeCode as TypeCode } from "../../../../src/generated/proto/krpc";

jest.spyOn(global.console, "warn").mockImplementation(() => {});

describe("build-type", () => {
  const service = "Service1";

  it("should return any if code is unknown", () => {
    expect(createType({ code: 12345 }, service, false)).toEqual("any");
  });

  it.each`
    typeName                  | type
    ${"number"}               | ${{ code: TypeCode.DOUBLE }}
    ${"number"}               | ${{ code: TypeCode.FLOAT }}
    ${"number"}               | ${{ code: TypeCode.SINT32 }}
    ${"Long"}                 | ${{ code: TypeCode.SINT64 }}
    ${"number"}               | ${{ code: TypeCode.UINT32 }}
    ${"Long"}                 | ${{ code: TypeCode.UINT64 }}
    ${"string"}               | ${{ code: TypeCode.STRING }}
    ${"boolean"}              | ${{ code: TypeCode.BOOL }}
    ${"Uint8Array"}           | ${{ code: TypeCode.BYTES }}
    ${"EnumName"}             | ${{ service, name: "EnumName", code: TypeCode.ENUMERATION }}
    ${"Service2.EnumName"}    | ${{ service: "Service2", name: "EnumName", code: TypeCode.ENUMERATION }}
    ${"ClassName"}            | ${{ service, name: "ClassName", code: TypeCode.CLASS }}
    ${"Service2.ClassName"}   | ${{ service: "Service2", name: "ClassName", code: TypeCode.CLASS }}
    ${"number[]"}             | ${{ code: TypeCode.LIST, types: [{ code: TypeCode.FLOAT }] }}
    ${"Set<number>"}          | ${{ code: TypeCode.SET, types: [{ code: TypeCode.FLOAT }] }}
    ${"Service2.ClassName[]"} | ${{ code: TypeCode.LIST, types: [{ service: "Service2", name: "ClassName", code: TypeCode.CLASS }] }}
    ${"[string, number]"}     | ${{ code: TypeCode.TUPLE, types: [{ code: TypeCode.STRING }, { code: TypeCode.FLOAT }] }}
    ${"proto.Event"}          | ${{ code: TypeCode.EVENT }}
    ${"proto.ProcedureCall"}  | ${{ code: TypeCode.PROCEDURE_CALL }}
    ${"proto.Stream"}         | ${{ code: TypeCode.STREAM }}
    ${"proto.Status"}         | ${{ code: TypeCode.STATUS }}
    ${"proto.Services"}       | ${{ code: TypeCode.SERVICES }}
  `(
    "should create a $typeName type from $type for returns",
    ({ typeName, type }) => {
      expect(createType(type, service, true)).toEqual(typeName);
    }
  );

  it.each`
    typeName                       | type
    ${"number"}                    | ${{ code: TypeCode.DOUBLE }}
    ${"number"}                    | ${{ code: TypeCode.FLOAT }}
    ${"number"}                    | ${{ code: TypeCode.SINT32 }}
    ${"number | Long"}             | ${{ code: TypeCode.SINT64 }}
    ${"number"}                    | ${{ code: TypeCode.UINT32 }}
    ${"number | Long"}             | ${{ code: TypeCode.UINT64 }}
    ${"string"}                    | ${{ code: TypeCode.STRING }}
    ${"boolean"}                   | ${{ code: TypeCode.BOOL }}
    ${"Uint8Array"}                | ${{ code: TypeCode.BYTES }}
    ${"EnumName"}                  | ${{ service, name: "EnumName", code: TypeCode.ENUMERATION }}
    ${"Service2.EnumName"}         | ${{ service: "Service2", name: "EnumName", code: TypeCode.ENUMERATION }}
    ${"ClassName"}                 | ${{ service, name: "ClassName", code: TypeCode.CLASS }}
    ${"Service2.ClassName"}        | ${{ service: "Service2", name: "ClassName", code: TypeCode.CLASS }}
    ${"number[]"}                  | ${{ code: TypeCode.LIST, types: [{ code: TypeCode.FLOAT }] }}
    ${"Service2.ClassName[]"}      | ${{ code: TypeCode.LIST, types: [{ service: "Service2", name: "ClassName", code: TypeCode.CLASS }] }}
    ${"Set<number>"}               | ${{ code: TypeCode.SET, types: [{ code: TypeCode.FLOAT }] }}
    ${"[string, number]"}          | ${{ code: TypeCode.TUPLE, types: [{ code: TypeCode.STRING }, { code: TypeCode.FLOAT }] }}
    ${"{ [key: number]: string }"} | ${{ code: TypeCode.DICTIONARY, types: [{ code: TypeCode.SINT32 }, { code: TypeCode.STRING }] }}
    ${"proto.Event"}               | ${{ code: TypeCode.EVENT }}
    ${"proto.Event"}               | ${{ code: TypeCode.EVENT }}
    ${"proto.ProcedureCall"}       | ${{ code: TypeCode.PROCEDURE_CALL }}
    ${"proto.Stream"}              | ${{ code: TypeCode.STREAM }}
    ${"proto.Status"}              | ${{ code: TypeCode.STATUS }}
    ${"proto.Services"}            | ${{ code: TypeCode.SERVICES }}
  `(
    "should create a $typeName type from $type for arguments",
    ({ typeName, type }) => {
      expect(createType(type, service, false)).toEqual(typeName);
    }
  );
});
