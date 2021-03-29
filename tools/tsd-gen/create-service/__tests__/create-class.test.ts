import createClass from "../create-class";

jest.mock("../create-doc.ts", () => jest.fn(({ name }) => [name]));
jest.mock("../create-procedure.ts", () => jest.fn(({ name }) => name));

describe("map-class", () => {
  const stubService = {
    name: "Service",
    procedures: [
      {
        name: "proc1",
      },
      {
        name: "ClassName_proc2",
      },
    ],
  };

  it("should use the class name", () => {
    expect(createClass({ name: "ClassName" }, stubService)).toEqual(
      expect.objectContaining({
        name: "ClassName",
      })
    );
  });

  it("should generate documentation", () => {
    const clazz = { name: "ClassName" };
    expect(createClass(clazz, stubService)).toEqual(
      expect.objectContaining({
        documentation: ["ClassName"],
      })
    );
  });

  it("should map the class procedures", () => {
    const clazz = { name: "ClassName" };
    expect(createClass(clazz, stubService)).toEqual(
      expect.objectContaining({
        procedures: ["ClassName_proc2"],
      })
    );
  });

  it("should have empty string name if name is undefiend", () => {
    const clazz = {};
    const service = {};
    expect(createClass(clazz, service)).toEqual(
      expect.objectContaining({
        name: "",
      })
    );
  });

  it("should return no procedures if servce procedures is undefined", () => {
    const clazz = { name: "ClassName" };
    const service = {};
    expect(createClass(clazz, service)).toEqual(
      expect.objectContaining({
        procedures: [],
      })
    );
  });
});
