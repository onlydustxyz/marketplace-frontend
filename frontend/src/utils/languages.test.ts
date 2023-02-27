import { describe, expect } from "vitest";
import { getDeduplicatedAggregatedLanguages, getMostUsedLanguages } from "./languages";
import { LanguageMap } from "src/types";
import { GithubRepoLanguagesFieldsFragment } from "src/__generated/graphql";

const githubRepo1: GithubRepoLanguagesFieldsFragment = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 1000,
  githubRepoDetails: {
    id: 1000,
    languages: { Cairo: 1000, Rust: 100, HTML: 150 },
  },
};

const githubRepo2: GithubRepoLanguagesFieldsFragment = {
  __typename: "ProjectGithubRepos",
  githubRepoId: 1001,
  githubRepoDetails: {
    id: 1001,
    languages: { Rust: 80, Go: 40, Cairo: 2000 },
  },
};

describe.each([
  {
    languages: {
      Cairo: 1000,
      html: 100,
      css: 10,
      Rust: 10000,
    },
    count: 2,
    expected: ["Rust", "Cairo"],
  },
  {
    languages: {
      Cairo: 1000,
      html: 100,
      css: 100,
      Rust: 10000,
    },
    count: 9,
    expected: ["Rust", "Cairo", "css", "html"],
  },
  {
    languages: {
      Cairo: 100,
      html: 100,
      css: 100,
      Rust: 100,
    },
    count: 3,
    expected: ["Cairo", "css", "html"],
  },
  {
    languages: {},
    count: 2,
    expected: [],
  },
])("getMostUsedLanguages", ({ languages, count, expected }) => {
  test("should return most used languages in descending order", async () => {
    const result = getMostUsedLanguages(languages as LanguageMap, count);
    expect(result).toStrictEqual(expected);
  });
});

describe.each([
  { repos: [], expected_languages: {} },
  { repos: [githubRepo1], expected_languages: { Cairo: 1000, Rust: 100, HTML: 150 } },
  { repos: [githubRepo1, githubRepo2], expected_languages: { Cairo: 3000, Go: 40, Rust: 180, HTML: 150 } },
])("Listing languages", ({ repos, expected_languages }) => {
  test("should aggregate and deduplicate languages of Github repos", async () => {
    const languages = getDeduplicatedAggregatedLanguages(repos);
    expect(languages).toEqual(expected_languages);
  });
});
