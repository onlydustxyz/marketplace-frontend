import { Currency } from "src/types";
import { formatMoneyAmount } from "src/utils/money";
import { describe, expect, it } from "vitest";

describe("Money", () => {
  it("should be formatted in dollars", () => {
    expect(formatMoneyAmount({ amount: 12345 })).toBe("$12,345");
  });

  it("should be formatted in compact mode in dollars", () => {
    expect(formatMoneyAmount({ amount: 123, notation: "compact" })).toBe("$123");
    expect(formatMoneyAmount({ amount: 12345, notation: "compact" })).toBe("$12.3k");
    expect(formatMoneyAmount({ amount: 12010, notation: "compact" })).toBe("$12k");
  });

  it("should be formatted in Optimism", () => {
    expect(formatMoneyAmount({ amount: 12345, currency: Currency.OP })).toBe("12,345 OP");
  });

  it("should be formatted in compact mode in correct Cryptos format", () => {
    expect(formatMoneyAmount({ amount: 123, currency: Currency.APT, notation: "compact" })).toBe("123 APT");
    expect(formatMoneyAmount({ amount: 12345, currency: Currency.ETH, notation: "compact" })).toBe("12.3k ETH");
    expect(formatMoneyAmount({ amount: 12010, currency: Currency.STARK, notation: "compact" })).toBe("12k STARK");
  });
});
