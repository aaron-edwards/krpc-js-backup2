import fc from "fast-check";

import add from "../index";

describe("test", () => {
  it("should add", () => {
    fc.assert(fc.property(fc.nat(), fc.nat(), (a, b) => add(a, b) === a + b));
  });
});
