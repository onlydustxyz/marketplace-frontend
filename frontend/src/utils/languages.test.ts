import { describe, expect } from "vitest";
import { getMostUsedLanguages } from "./languages";
import { LanguageMap } from "src/types";

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
