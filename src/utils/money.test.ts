import { describe, expect, it } from "vitest";

import { formatAmount } from "src/utils/money";

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
