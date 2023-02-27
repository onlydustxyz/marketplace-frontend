import { gql } from "@apollo/client";
import { LanguageMap } from "src/types";
import { GithubRepoLanguagesFieldsFragment } from "src/__generated/graphql";

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

export const getDeduplicatedAggregatedLanguages = function (
  githubRepos: GithubRepoLanguagesFieldsFragment[] | undefined
): LanguageMap {
  if (githubRepos === undefined) {
    return {};
  }
  return githubRepos
    .map(repo => repo.githubRepoDetails?.languages)
    .filter((languages): languages is LanguageMap => !!languages) // ⚠️ runtime type guard
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

export const GITHUB_REPOS_LANGUAGES_FRAGMENT = gql`
  fragment GithubRepoLanguagesFields on ProjectGithubRepos {
    githubRepoId
    githubRepoDetails {
      id
      languages
    }
  }
`;
