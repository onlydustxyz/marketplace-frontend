import { formatDollars } from "src/utils/money";
import { describe, expect, it } from "vitest";

describe("Money", () => {
  it("should be formatted in dollars", () => {
    expect(formatDollars(12345)).toBe("$12,345");
  });
});
