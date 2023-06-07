import { LanguageMap } from "src/types";
import { GithubRepoLanguagesFragment, Maybe } from "src/__generated/graphql";
import isDefined from "./isDefined";
import config from "src/config";
import { toLower } from "lodash";

const REMOVED_LANGUAGES = config.LANGUAGES_FILTER?.split(",").map(toLower) || [];

export const getMostUsedLanguages = (languageMap: LanguageMap, count = 3) => {
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

  return filterRemovedLanguages([...sortedLanguages.keys()]).slice(0, count);
};

export const filterRemovedLanguages = (languages: string[]) =>
  languages.filter(l => !REMOVED_LANGUAGES.includes(l?.toLowerCase()));

export const buildLanguageString = (languages: string[]) => {
  return languages.map(str => str.toLowerCase()).join(", ");
};

export const getDeduplicatedAggregatedLanguages = function (
  githubRepos: Maybe<GithubRepoLanguagesFragment>[] | undefined
): LanguageMap {
  if (githubRepos === undefined) {
    return {};
  }
  return githubRepos
    .map(repo => repo?.languages)
    .filter(isDefined) // ⚠️ runtime type guard
    .reduce((aggregated_languages, languages) => {
      for (const [language, line_count] of Object.entries(languages)) {
        if (aggregated_languages[language]) {
          aggregated_languages[language] += line_count;
        } else {
          aggregated_languages[language] = line_count;
        }
      }
      return aggregated_languages;
    }, {});
};
