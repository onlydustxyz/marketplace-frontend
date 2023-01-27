import { Currency } from "src/types";
import { formatMoneyAmount } from "src/utils/money";
import { describe, expect, it } from "vitest";

describe("Money", () => {
  it("should be formatted in dollars", () => {
    expect(formatMoneyAmount(12345)).toBe("$12,345");
  });
  it("should be formatted in USDC", () => {
    expect(formatMoneyAmount(12345, Currency.USDC)).toBe("USDC 12,345");
  });
});
