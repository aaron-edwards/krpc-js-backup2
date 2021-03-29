/* eslint-disable import/no-extraneous-dependencies */
import { join } from "path";

import { readFile, writeFile } from "fs-extra";
import { compile } from "handlebars";

import { ParsedService } from "./types";

const createPath = (service: ParsedService) =>
  join(
    __dirname,
    "..",
    "..",
    "src",
    "generated",
    "services",
    `${service.name}.ts`
  );

const generateFile = (
  template: Handlebars.TemplateDelegate<ParsedService>,
  service: ParsedService
) => ({
  path: createPath(service),
  content: template(service),
});

export default async (services: ParsedService[]) => {
  const indexTemplate = compile(
    await readFile(join(__dirname, "templates", "index.ts.hbs"), "utf-8")
  );
  const serviceTemplate = compile(
    await readFile(join(__dirname, "templates", "krpc-service.ts.hbs"), "utf-8")
  );

  return Promise.all([
    writeFile(
      join(__dirname, "..", "..", "src", "generated", "services", "index.d.ts"),
      indexTemplate({ services })
    ),
    ...services
      .map((s) => generateFile(serviceTemplate, s))
      .map(({ path, content }) => writeFile(path, content)),
  ]);
};
