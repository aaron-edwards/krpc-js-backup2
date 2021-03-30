import { Long } from "protobufjs";

import { RpcClass } from "../../types";
import { Type_TypeCode as TypeCode } from "../../generated/proto/krpc";
import { encode, decode } from "..";

jest.spyOn(global.console, "warn").mockImplementation(() => undefined);
jest.spyOn(global.console, "error").mockImplementation(() => undefined);

describe("encode and decode", () => {
  afterEach(jest.resetAllMocks);

  class DummyClass implements RpcClass {
    readonly id: Long;
    constructor(id: Long) {
      this.id = id;
    }
  }

  const services = {
    Service: {
      name: "Service",
      enums: { enum: ["value0", "value1"] },
      classes: { rcpClass: DummyClass },
    },
  };

  const newLong = (low = 0, high = 0, unsigned = true) => ({
    low,
    high,
    unsigned,
  });

  it.each`
    value                         | code                    | extra
    ${3.25}                       | ${TypeCode.DOUBLE}      | ${{}}
    ${3.25}                       | ${TypeCode.FLOAT}       | ${{}}
    ${-1}                         | ${TypeCode.SINT32}      | ${{}}
    ${newLong(1, 4, false)}       | ${TypeCode.SINT64}      | ${{}}
    ${100}                        | ${TypeCode.UINT32}      | ${{}}
    ${newLong(4, 54, true)}       | ${TypeCode.UINT64}      | ${{}}
    ${true}                       | ${TypeCode.BOOL}        | ${{}}
    ${false}                      | ${TypeCode.BOOL}        | ${{}}
    ${Buffer.from([1, 2])}        | ${TypeCode.BYTES}       | ${{}}
    ${"Hello"}                    | ${TypeCode.STRING}      | ${{}}
    ${[1, 1, 2, 3, 5]}            | ${TypeCode.LIST}        | ${{ types: [{ code: TypeCode.UINT32 }] }}
    ${new Set([1, 2, 3, 4])}      | ${TypeCode.SET}         | ${{ types: [{ code: TypeCode.UINT32 }] }}
    ${["one", 1]}                 | ${TypeCode.TUPLE}       | ${{ types: [{ code: TypeCode.STRING }, { code: TypeCode.SINT32 }] }}
    ${{ one: 1, two: 2 }}         | ${TypeCode.DICTIONARY}  | ${{ types: [{ code: TypeCode.STRING }, { code: TypeCode.SINT32 }] }}
    ${"value1"}                   | ${TypeCode.ENUMERATION} | ${{ service: "Service", name: "enum" }}
    ${new DummyClass(newLong(1))} | ${TypeCode.CLASS}       | ${{ service: "Service", name: "rcpClass" }}
  `(
    "should encode and decode type code $code with value $value",
    ({ value, code, extra }) => {
      const type = { code, ...extra };
      const encoded = encode(value, type, services);
      const decoded = decode(encoded as Uint8Array, type, services);

      // eslint-disable-next-line no-console
      expect(console.warn).not.toHaveBeenCalled();
      expect(decoded).toEqual(value);
    }
  );

  it("should warn if unknown type is found for an encoder", () => {
    const encoded = encode(
      "value",
      { code: 123456789, name: "unknown" },
      services
    );
    expect(encoded).toBeUndefined();

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith(
      "No encoder found for type with typecode of 123456789 and name unknown"
    );
  });

  it("should warn if unknown type is found for an decoder", () => {
    const decoded = decode(
      Buffer.from([]),
      { code: 123456789, name: "unknown" },
      services
    );
    expect(decoded).toBeUndefined();

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith(
      "No decoder found for type with typecode of 123456789 and name unknown"
    );
  });
});
