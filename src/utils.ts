import { FindInFilesProps } from "./types";

/**
 * Converts an emacs consult (with orderless) search string to a vscode "find-in-files" input.
 *
 * @example
 * "func process#.tsx !.test !.stories" // => { query: "func.*process",
 *                                      //      filesToInclude: ".tsx",
 *                                      //      filesToExclude: ".test,.stories"}
 */
export function parseSearchInput(searchInput: string): FindInFilesProps {
  const [rawQuery = "", rest = ""] = searchInput.split("#");

  const query = rawQuery.replace(/\s+/g, ".*");

  const fileFilters = rest.split(/\s+/g);
  const filesToInclude = fileFilters.filter((f) => !/^!.*/.test(f)).join(",");
  const filesToExclude = fileFilters
    .filter((f) => /^!.*/.test(f))
    .map((f) => f.replaceAll("!", ""))
    .join(",");

  return { query, filesToInclude, filesToExclude };
}
