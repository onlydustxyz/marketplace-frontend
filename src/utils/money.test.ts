import { describe, expect, it } from "vitest";

import { Currency } from "src/types";
import { formatAmount, formatMoneyAmount } from "src/utils/money";

describe("Money", () => {
  it("should be formatted in dollars", () => {
    expect(formatMoneyAmount({ amount: 12345 })).toBe("12,345 USD");
  });

  it("should be formatted in compact mode in dollars", () => {
    expect(formatMoneyAmount({ amount: 123, notation: "compact" })).toBe("123 USD");
    expect(formatMoneyAmount({ amount: 12345, notation: "compact" })).toBe("12.3k USD");
    expect(formatMoneyAmount({ amount: 12010, notation: "compact" })).toBe("12k USD");
  });

  it("should be formatted in Optimism", () => {
    expect(formatMoneyAmount({ amount: 12345, currency: Currency.OP })).toBe("12,345 OP");
  });

  it("should be formatted in compact mode in correct Cryptos format", () => {
    expect(formatMoneyAmount({ amount: 123, currency: Currency.APT, notation: "compact" })).toBe("123 APT");
    expect(formatMoneyAmount({ amount: 12345, currency: Currency.ETH, notation: "compact" })).toBe("12.345k ETH");
    expect(formatMoneyAmount({ amount: 12010, currency: Currency.STRK, notation: "compact" })).toBe("12.01k STRK");
    expect(formatMoneyAmount({ amount: 12010, currency: Currency.LORDS, notation: "compact" })).toBe("12.01k LORDS");
  });
});

describe("formatAmount", () => {
  it("formats a number correctly without currency", () => {
    const result = formatAmount({ amount: 1234.56 });
    expect(result).toBe("1,234.56");
  });

  it("returns 'N/A' when amount is undefined", () => {
    const result = formatAmount({});
    expect(result).toBe("N/A");
  });

  it("formats a number correctly with USD currency", () => {
    const result = formatAmount({ amount: 1234.56, currency: "USD" });
    expect(result).toBe("1,234.56 USD");
  });

  it("handles zero decimals", () => {
    const result = formatAmount({ amount: 1234, fixedDecimals: 0 });
    expect(result).toBe("1,234");
  });

  it("formats a number correctly with ETH currency and no decimal places", () => {
    const result = formatAmount({ amount: 1234.56, fixedDecimals: 0, currency: "ETH" });
    expect(result).toBe("1,235 ETH");
  });

  it("uses specified locale for formatting", () => {
    const result = formatAmount({ amount: 1234.56, locale: "de-DE" });
    expect(result).toBe("1.234,56");
  });

  it("formats a very large number correctly with currency", () => {
    const result = formatAmount({ amount: 123456789.12, currency: "APT" });
    expect(result).toBe("123,456,789.12 APT");
  });

  it("handles negative numbers correctly", () => {
    const result = formatAmount({ amount: -1234.56, currency: "USD" });
    expect(result).toBe("-1,234.56 USD");
  });
});
