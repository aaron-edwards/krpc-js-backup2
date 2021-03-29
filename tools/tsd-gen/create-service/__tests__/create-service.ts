import { Type_TypeCode as TypeCode } from "../../../../src/generated/proto/krpc";
import createService from "..";

jest.spyOn(global.console, "log").mockImplementation(() => undefined);

jest.mock("../create-class.ts", () => jest.fn(({ name }) => ({ name })));
jest.mock("../create-procedure.ts", () =>
  jest.fn(({ name }) => ({ funcName: name }))
);
jest.mock("../create-doc.ts", () => jest.fn(({ name }) => [name]));

describe("map-service", () => {
  afterEach(jest.clearAllMocks);

  it("should add the service name", () => {
    const service = { name: "Service" };
    expect(createService(service)).toHaveProperty("name", service.name);
  });

  it("should process all the classess", () => {
    const service = { classes: [{ name: "Class" }] };
    expect(createService(service)).toHaveProperty("classes", [
      { name: "Class" },
    ]);
  });

  it("should add documentation", () => {
    const service = { name: "Service" };
    expect(createService(service)).toHaveProperty("documentation", ["Service"]);
  });

  it("should add procedures", () => {
    const service = { procedures: [{ name: "proc" }] };
    expect(createService(service)).toHaveProperty("procedures", [
      { funcName: "proc" },
    ]);
  });

  it("should add enums", () => {
    const e = { name: "enum", values: [{ name: "one" }] };

    const service = {
      enumerations: [e],
    };
    expect(createService(service)).toHaveProperty("enumerations", [
      { ...e, documentation: [e.name] },
    ]);
  });

  describe("imports", () => {
    it("should have no imports if there are no procedures", () => {
      const service = {};
      expect(createService(service)).toHaveProperty("imports", []);
    });

    describe.each([TypeCode.SINT64, TypeCode.UINT64])(
      "Long imports code %s",
      (code) => {
        it("should import for parameters", () => {
          const service = {
            name: "Service",
            procedures: [{ name: "proc1", parameters: [{ type: { code } }] }],
          };
          expect(createService(service)).toHaveProperty("importLong", true);
        });
        it("should import for returns", () => {
          const service = {
            name: "Service",
            procedures: [{ name: "proc1", returnType: { code } }],
          };
          expect(createService(service)).toHaveProperty("importLong", true);
        });
      }
    );
    describe.each([
      TypeCode.EVENT,
      TypeCode.PROCEDURE_CALL,
      TypeCode.STREAM,
      TypeCode.STATUS,
      TypeCode.SERVICES,
    ])("proto imports code %s", (code) => {
      it("should import proto for parameters", () => {
        const service = {
          name: "Service",
          procedures: [{ name: "proc1", parameters: [{ type: { code } }] }],
        };
        expect(createService(service)).toHaveProperty("importProto", true);
      });
      it("should import proto for returns", () => {
        const service = {
          name: "Service",
          procedures: [{ name: "proc1", returnType: { code } }],
        };
        expect(createService(service)).toHaveProperty("importProto", true);
      });
    });

    it("should add return type class imports", () => {
      const service = {
        name: "Service",
        procedures: [{ name: "proc1", returnType: { service: "Other" } }],
      };
      expect(createService(service)).toHaveProperty("imports", ["Other"]);
    });

    it("should import parameter imports", () => {
      const service = {
        name: "Service",
        procedures: [
          { name: "proc1", parameters: [{ type: { service: "Other" } }] },
        ],
      };
      expect(createService(service)).toHaveProperty("imports", ["Other"]);
    });

    it("should not duplicate type imports", () => {
      const service = {
        name: "Service",
        procedures: [
          { name: "proc1", returnType: { service: "Other" } },
          { name: "proc2", parameters: [{ type: { service: "Other" } }] },
        ],
      };
      expect(createService(service)).toHaveProperty("imports", ["Other"]);
    });

    it("should allow empty types", () => {
      const service = {
        name: "Service",
        procedures: [{ name: "proc2", parameters: [{ type: undefined }] }],
      };
      expect(createService(service)).toHaveProperty("imports", []);
    });

    it("should not import itself", () => {
      const service = {
        name: "Service",
        procedures: [{ name: "proc2", returnType: { service: "Service" } }],
      };
      expect(createService(service)).toHaveProperty("imports", []);
    });
  });
});
