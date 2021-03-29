type Context = { documentation?: string };

const isEmpty = (str: string) => !str;

const extractDoc = (doc: string) =>
  doc.replace(/<doc>([^]+)<\/doc>/, (_, p1) => p1);

const extractSummary = (doc: string) => {
  const match = doc.match(/<summary>([^]+)<\/summary>/);
  return (match && match[1]) || "";
};

const extractRemarks = (doc: string) => {
  const match = doc.match(/<remarks>([^]+)<\/remarks>/);
  return (match && match[1]) || "";
};

const replaceLinks = (docString: string) =>
  docString.replace(
    /<a href="(.*)">(.*)<\/a>/,
    (_, p1, p2) => `[${p2}]{@link ${p1}}`
  );

const replaceSee = (docString: string) =>
  docString.replace(/<see cref="[T|M]:(.*)" \/>/, (_, p1) => `{@link ${p1}}`);

const trimDuplicateEmptyLines = (lines: string[]) =>
  lines.filter((line, index) =>
    index === 0 ? !isEmpty(line) : !isEmpty(line) || !isEmpty(lines[index - 1])
  );

const trimBlanks = (lines: string[]) => {
  const start = lines.findIndex((l) => l.length !== 0);

  const end = lines.reduceRight(
    (blankIdx, line, idx) =>
      blankIdx === -1 && line.length !== 0 ? idx : blankIdx,
    -1
  );
  return trimDuplicateEmptyLines(lines.slice(start, end + 1));
};

const processBlock = (text: string) =>
  text.split("\n").map(replaceLinks).map(replaceSee);

const createDoc = (context: Context) => {
  const doc = extractDoc(context.documentation || "");
  const text = [
    ...processBlock(extractSummary(doc)),
    "",
    ...processBlock(extractRemarks(doc)),
  ];
  return trimBlanks(text);
};

export default createDoc;
export type CreateDoc = typeof createDoc;
