/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react-hooks";
import { useCurrenciesOrder, useCurrenciesOrderCurrency } from "./useCurrenciesOrder";

describe("useCurrenciesOrder", () => {
  it("Order currency", () => {
    const currencies: { currency: useCurrenciesOrderCurrency }[] = [
      { currency: "STARK" },
      { currency: "APT" },
      { currency: "USD" },
      { currency: "ETH" },
      { currency: "OP" },
    ];

    const { result } = renderHook(() => useCurrenciesOrder({ currencies }));
    const sortedCurrencies = result.current;

    expect(sortedCurrencies.map(currency => currency.currency)).toEqual(["USD", "ETH", "STARK", "OP", "APT"]);
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
