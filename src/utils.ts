import { FindInFilesProps } from "./types";

/**
 * Converts an emacs consult (with orderless) search string to a vscode "find-in-files" input.
 *
 * @example
 * "func process#.tsx !.test !util" // => { query: "func.*process",
 *                                      //      filesToInclude: "*.tsx",
 *                                      //      filesToExclude: "*.test,*util*"}
 */
export function parseSearchInput(searchInput: string): FindInFilesProps {
  const [rawQuery = "", rest = ""] = searchInput.split("#");

  const query = rawQuery.replace(/\s+/g, ".*");

  const fileFilters = rest.split(/\s+/g);
  const filesToInclude = fileFilters
    .filter((f) => f && !/^!.*/.test(f))
    .map(parseFilePattern)
    .join(",");
  const filesToExclude = fileFilters
    .filter((f) => f && /^!.*/.test(f))
    .map((f) => f.replaceAll("!", ""))
    .map(parseFilePattern)
    .join(",");

  return { query, filesToInclude, filesToExclude };
}

/**
 * If the pattern is an extension (e.g. ".tsx"), add "*" just to the front (since we don't care about partial matches).
 * Otherwise, search for a partial match. (e.g. "util" => "*utils*")
 */
function parseFilePattern(pattern: string) {
  if (pattern.startsWith(".")) return `*${pattern}`;
  return `*${pattern}*`;
}
