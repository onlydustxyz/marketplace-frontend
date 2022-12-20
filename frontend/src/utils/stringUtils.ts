import { LanguageMap } from "src/types";

export const decodeBase64ToString = (x: string) => decodeURIComponent(escape(atob(x)));
export const buildGithubLink = (repoOwner: string, repoName: string) =>
  `https://www.github.com/${repoOwner}/${repoName}`;
export const buildLanguageString = (languageMap: LanguageMap) => {
  return Object.keys(languageMap)
    .slice(0, 2)
    .map(str => str.toLowerCase())
    .join(", ");
};
