import { Currency } from "src/types";
import { formatMoneyAmount } from "src/utils/money";
import { describe, expect, it } from "vitest";

describe("Money", () => {
  it("should be formatted in dollars", () => {
    expect(formatMoneyAmount({ amount: 12345 })).toBe("$12,345");
  });
  it("should be formatted in compact mode in dollars", () => {
    expect(formatMoneyAmount({ amount: 123, notation: "compact" })).toBe("$123");
    expect(formatMoneyAmount({ amount: 12345, notation: "compact" })).toBe("$12.3K");
  });
  it("should be formatted in USDC", () => {
    expect(formatMoneyAmount({ amount: 12345, currency: Currency.USDC })).toBe("USDC 12,345");
  });
  it("should be formatted in compact mode in USDC", () => {
    expect(formatMoneyAmount({ amount: 123, currency: Currency.USDC, notation: "compact" })).toBe("USDC 123");
    expect(formatMoneyAmount({ amount: 12345, currency: Currency.USDC, notation: "compact" })).toBe("USDC 12.3K");
  });
});
