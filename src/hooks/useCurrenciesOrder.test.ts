/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react-hooks";
import { Money } from "utils/Money";
import { describe, expect, it } from "vitest";

import { CurrencyOrder } from "src/types";

import { useCurrenciesOrder } from "./useCurrenciesOrder";

describe("useCurrenciesOrder", () => {
  it("Order currency", () => {
    const currencies: { currency: Money.Currency }[] = [
      { currency: Money.fromSchema({ code: "STRK" }) },
      { currency: Money.fromSchema({ code: "APT" }) },
      { currency: Money.fromSchema({ code: "USD" }) },
      { currency: Money.fromSchema({ code: "ETH" }) },
      { currency: Money.fromSchema({ code: "OP" }) },
      { currency: Money.fromSchema({ code: "LORDS" }) },
      { currency: Money.fromSchema({ code: "USDC" }) },
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
