import createDoc from "../create-doc";

describe("documentation parser", () => {
  it("should return nothing if there is no documentation", () => {
    expect(createDoc({})).toEqual([]);
  });

  it("should build a documentation string", () => {
    const doc = "<doc>\n<summary>Description of something\n</summary>\n</doc>";
    const context = { documentation: doc };
    expect(createDoc(context)).toEqual(["Description of something"]);
  });

  it("should add newLine characters", () => {
    const doc =
      "<doc>\n<summary>Description of something\nWith a 2nd Line\n</summary>\n</doc>";
    const context = { documentation: doc };
    expect(createDoc(context)).toEqual([
      "Description of something",
      "With a 2nd Line",
    ]);
  });

  it("should add remarks", () => {
    const doc =
      "<doc>\n<summary>Description of something</summary><remarks>With a remark</remarks>\n</doc>";
    const context = { documentation: doc };
    expect(createDoc(context)).toEqual([
      "Description of something",
      "",
      "With a remark",
    ]);
  });

  describe("links", () => {
    it("should create named links in summaries", () => {
      const doc =
        '<doc>\n<summary>Description of something <a href="https://link.com">A link</a></summary>\n</doc>';
      const context = { documentation: doc };
      expect(createDoc(context)).toEqual([
        "Description of something [A link]{@link https://link.com}",
      ]);
    });

    it("should create named links in remarks", () => {
      const doc =
        '<doc>\n<remarks>remak of something <a href="https://link.com">A link</a></remarks>\n</doc>';
      const context = { documentation: doc };
      expect(createDoc(context)).toEqual([
        "remak of something [A link]{@link https://link.com}",
      ]);
    });

    it("should create unnamed links in summaries", () => {
      const doc =
        '<doc>\n<summary>Description of something <see cref="T:SpaceCenter.Node" /></summary>\n</doc>';
      const context = { documentation: doc };
      expect(createDoc(context)).toEqual([
        "Description of something {@link SpaceCenter.Node}",
      ]);
    });

    it("should create unnamed links in remarks", () => {
      const doc =
        '<doc>\n<remarks>remak of something <see cref="T:SpaceCenter.Node" /></remarks>\n</doc>';
      const context = { documentation: doc };
      expect(createDoc(context)).toEqual([
        "remak of something {@link SpaceCenter.Node}",
      ]);
    });
  });
});
