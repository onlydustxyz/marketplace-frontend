import { describe, expect } from "vitest";
import { REGEX_GITHUB_PULL_REQUEST_URL } from ".";

describe.each([
  { link: "https://github.com/onlydustxyz/marketplace/pull/504", pullRequestNumber: "504" },
  { link: "https://github.com/only-dust.xyz123/42_market---p.l.a.c.e/pull/66666", pullRequestNumber: "66666" },
  { link: "https://github.com/ONLY-dust/F00/pull/66666", pullRequestNumber: "66666" },
])("Github PR regexp", ({ link, pullRequestNumber }) => {
  test(`should parse link '${link}'`, async () => {
    const matches = REGEX_GITHUB_PULL_REQUEST_URL.exec(link);
    expect(matches).toHaveLength(2);
    expect(matches && matches[1]).toEqual(pullRequestNumber);
  });
});
