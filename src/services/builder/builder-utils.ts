const snakeToCamel = (str: string) =>
  str
    .replace(/([-_])([a-z])/gi, (_match, _p1, p2) => p2.toUpperCase())
    .replace(/^(.)/, (_m, p) => p.toLowerCase());

// eslint-disable-next-line import/prefer-default-export
export const createFunctionName = (name?: string, className?: string) => {
  const n = name || "";
  const isStatic = n.includes("_static_");
  const regex = isStatic
    ? RegExp(`${className}_static_(.*)`)
    : RegExp(`${className}_(.*)`);

  const nameWithoutClass = className ? n.replace(regex, (_match, p1) => p1) : n;

  return snakeToCamel(nameWithoutClass);
};
