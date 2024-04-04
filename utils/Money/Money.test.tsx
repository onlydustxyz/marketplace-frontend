import { Money } from "utils/Money/Money";
import { describe, expect, it } from "vitest";

describe("Money", () => {
  describe("format", () => {
    it("format as string", () => {
      const currencyMock = {
        code: "USD",
        decimals: 2,
        id: "",
        logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
        name: "US Dollar",
      };
      const amount = 1999.991;
      const expected = "1,999.99 USD";
      const result = Money.format({ amount, currency: currencyMock }).string;
      expect(result).toEqual(expected);
    });
    it("format as string with tilde", () => {
      const currencyMock = {
        code: "USD",
        decimals: 2,
        id: "",
        logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
        name: "US Dollar",
      };
      const amount = 1999.991;
      const expected = "~1,999.99 USD";
      const result = Money.format({ amount, currency: currencyMock, options: { prefixAmountWithTilde: true } }).string;
      expect(result).toEqual(expected);
    });
    it("format as string without currency", () => {
      const currencyMock = {
        code: "USD",
        decimals: 2,
        id: "",
        logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
        name: "US Dollar",
      };
      const amount = 1999.991;
      const expected = "1,999.99";
      const result = Money.format({ amount, currency: currencyMock, options: { showCurrency: false } }).string;
      expect(result).toEqual(expected);
    });
    it("format as string without currency and tilde", () => {
      const currencyMock = {
        code: "USD",
        decimals: 2,
        id: "",
        logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
        name: "US Dollar",
      };
      const amount = 1999.991;
      const expected = "~1,999.99";
      const result = Money.format({
        amount,
        currency: currencyMock,
        options: { prefixAmountWithTilde: true, showCurrency: false },
      }).string;
      expect(result).toEqual(expected);
    });
    it("Should return N/A when amount is null or undefined", () => {
      const currencyMock = {
        code: "USD",
        decimals: 2,
        id: "",
        logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
        name: "US Dollar",
      };
      const amount = null;
      const expected = "N/A";
      const result = Money.format({
        amount,
        currency: currencyMock,
        options: { prefixAmountWithTilde: true, showCurrency: false },
      }).string;
      expect(result).toEqual(expected);
    });
  });
  describe("isFiat", () => {
    it("USD is Fiat", () => {
      const expected = true;
      const result = Money.isFiat(Money.fromSchema({ code: "USD" }));
      expect(result).toEqual(expected);
    });
    it("OP is not Fiat", () => {
      const expected = false;
      const result = Money.isFiat(Money.fromSchema({ code: "OP" }));
      expect(result).toEqual(expected);
    });
  });
});
