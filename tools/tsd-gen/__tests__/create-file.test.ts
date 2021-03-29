import { join } from "path";

import { readFile, writeFile } from "fs-extra";

import createFiles from "../create-files";
import { ParsedService } from "../types";

jest.mock("fs-extra", () => ({
  writeFile: jest.fn(() => Promise.resolve()),
  readFile: jest.fn((path: string) => Promise.resolve(`${path} content`)),
}));

describe("create service files", () => {
  afterEach(jest.clearAllMocks);
  const service = { name: "Service" } as ParsedService;
  it("should generate service files", async () => {
    await createFiles([service]);

    const templatePath = join(
      __dirname,
      "..",
      "templates",
      "krpc-service.ts.hbs"
    );
    expect(readFile).toHaveBeenCalledWith(templatePath, "utf-8");
    const filePath = join(
      __dirname,
      "..",
      "..",
      "..",
      "src",
      "generated",
      "services",
      `${service.name}.ts`
    );
    expect(writeFile).toHaveBeenCalledWith(filePath, `${templatePath} content`);
  });

  it("should generate an index file", async () => {
    await createFiles([service]);

    const templatePath = join(__dirname, "..", "templates", "index.ts.hbs");
    expect(readFile).toHaveBeenCalledWith(templatePath, "utf-8");

    const filePath = join(
      __dirname,
      "..",
      "..",
      "..",
      "src",
      "generated",
      "services",
      "index.d.ts"
    );
    expect(writeFile).toHaveBeenCalledWith(filePath, `${templatePath} content`);
  });
});
