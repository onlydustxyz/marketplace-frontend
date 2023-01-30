import { LanguageMap } from "src/types";

export const getMostUsedLanguages = (languageMap: LanguageMap, count = 2) => {
  if (!languageMap) {
    return [];
  }
  const sortedLanguages = new Map(
    Object.entries(languageMap).sort((lang1, lang2) => {
      const lineCountDifference = lang2[1] - lang1[1];
      if (lineCountDifference === 0) {
        return lang1[0].localeCompare(lang2[0]);
      }
      return lineCountDifference;
    })
  );
  return [...sortedLanguages.keys()].slice(0, count);
};

export const buildLanguageString = (languageMap: LanguageMap) => {
  return getMostUsedLanguages(languageMap)
    .map(str => str.toLowerCase())
    .join(", ");
};
