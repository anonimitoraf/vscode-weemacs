export type FindInFilesProps = {
  query?: string;
  replace?: string;
  triggerSearch?: boolean;
  filesToInclude?: string;
  filesToExclude?: string;
  isRegex?: boolean;
  isCaseSensitive?: boolean;
  matchWholeWord?: boolean;
  preserveCase?: boolean;
  excludeSettingAndIgnoreFiles?: boolean;
};
