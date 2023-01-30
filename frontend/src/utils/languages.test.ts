import { describe, expect, it } from "vitest";
import { getMostUsedLanguages } from "./languages";

describe("Languages", () => {
  it("should return most used languages in descending order", () => {
    const result = getMostUsedLanguages(
      {
        Cairo: 1000,
        html: 100,
        css: 10,
        Rust: 10000,
      },
      2
    );
    expect(result).toStrictEqual(["Rust", "Cairo"]);
  });

  it("should return all languages in descending order when count is greater than language count", () => {
    const result = getMostUsedLanguages(
      {
        Cairo: 1000,
        html: 100,
        css: 10,
        Rust: 10000,
      },
      9
    );
    expect(result).toStrictEqual(["Rust", "Cairo", "html", "css"]);
  });

  it("should return languages in alphabetical order in case of equality", () => {
    const result = getMostUsedLanguages(
      {
        Cairo: 100,
        html: 100,
        css: 100,
        Rust: 100,
      },
      3
    );
    expect(result).toStrictEqual(["Cairo", "css", "html"]);
  });

  it("should return no language when there is nothing in language map", () => {
    const result = getMostUsedLanguages({}, 2);
    expect(result).toStrictEqual([]);
  });
});
