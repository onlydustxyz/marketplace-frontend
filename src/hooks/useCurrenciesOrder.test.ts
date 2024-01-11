/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";

import { CurrencyOrder } from "src/types";

import { useCurrenciesOrder, useCurrenciesOrderCurrency } from "./useCurrenciesOrder";

describe("useCurrenciesOrder", () => {
  it("Order currency", () => {
    const currencies: { currency: useCurrenciesOrderCurrency }[] = [
      { currency: "STRK" },
      { currency: "APT" },
      { currency: "USD" },
      { currency: "ETH" },
      { currency: "OP" },
      { currency: "LORDS" },
      { currency: "USDC" },
    ];

    const { result } = renderHook(() => useCurrenciesOrder({ currencies }));
    const sortedCurrencies = result.current;

    expect(sortedCurrencies.map(currency => currency.currency)).toEqual(CurrencyOrder);
  });

  it("Handle empty array", () => {
    const currencies: any[] = [];

    const { result } = renderHook(() => useCurrenciesOrder({ currencies }));
    const sortedCurrencies = result.current;

    expect(sortedCurrencies).toEqual([]);
  });

  it("handle undefined value", () => {
    const currencies: any[] | undefined = undefined;

    const { result } = renderHook(() => useCurrenciesOrder({ currencies }));
    const sortedCurrencies = result.current;

    expect(sortedCurrencies).toEqual([]);
  });
});
