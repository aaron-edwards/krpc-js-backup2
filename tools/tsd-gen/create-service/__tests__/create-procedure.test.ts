import createProcedure from "../create-procedure";
import createDoc from "../create-doc";

jest.mock("../create-type.ts", () => jest.fn(({ code }) => `${code}`));
jest.mock("../create-doc.ts", () => jest.fn(({ name }) => [name]));

describe("map procedures", () => {
  beforeEach(jest.clearAllMocks);

  it("should create a getter", () => {
    const procDef = {
      name: "Get_Value",
      returnType: { code: 123 },
    };

    expect(createProcedure(procDef, "ServiceName")).toEqual({
      funcName: "getValue",
      returnType: "Promise<123>",
      params: [],
      documentation: ["Get_Value"],
      static: false,
    });
  });

  it("should create a setter", () => {
    const procDef = {
      name: "Set_Value",
      parameters: [{ name: "name", type: { code: 123 } }],
    };

    expect(createProcedure(procDef, "ServiceName")).toEqual({
      funcName: "setValue",
      returnType: "Promise<void>",
      params: [{ name: "name", type: "123", default: false }],
      documentation: ["Set_Value"],
      static: false,
    });
  });

  it("should allow default args", () => {
    const procDef = {
      name: "DoSomething",
      parameters: [
        {
          name: "name",
          type: { code: 123 },
          defaultValue: new Uint8Array([1, 2, 3]),
        },
      ],
    };

    expect(createProcedure(procDef, "ServiceName")).toEqual({
      funcName: "doSomething",
      returnType: "Promise<void>",
      params: [{ name: "name", type: "123", default: true }],
      documentation: ["DoSomething"],
      static: false,
    });
  });

  it("should repace unsafe names", () => {
    const procDef = {
      name: "DoSomething",
      parameters: [
        { name: "function", type: { code: 123 } },
        { name: "class", type: { code: 321 } },
      ],
    };

    expect(createProcedure(procDef, "ServiceName")).toEqual({
      funcName: "doSomething",
      returnType: "Promise<void>",
      params: [
        { name: "func", type: "123", default: false },
        { name: "cls", type: "321", default: false },
      ],
      documentation: ["DoSomething"],
      static: false,
    });
  });

  it("should add documenation", () => {
    const procDef = {
      name: "DoSomething",
      parameters: [],
    };

    expect(createProcedure(procDef, "ServiceName")).toEqual({
      funcName: "doSomething",
      returnType: "Promise<void>",
      params: [],
      documentation: ["DoSomething"],
      static: false,
    });

    expect(createDoc).toHaveBeenCalledWith(procDef);
  });

  it("should remove the classname from the procedure", () => {
    const procDef = {
      name: "ClassName_DoSomething",
      parameters: [
        {
          name: "name",
          type: { code: 123 },
          defaultValue: new Uint8Array([1, 2, 3]),
        },
      ],
    };

    expect(createProcedure(procDef, "ServiceName", "ClassName")).toEqual({
      funcName: "doSomething",
      returnType: "Promise<void>",
      params: [{ name: "name", type: "123", default: true }],
      documentation: ["ClassName_DoSomething"],
      static: false,
    });
  });
});
