import { useMemo } from "react";

export type useCurrenciesOrderCurrency = "APT" | "ETH" | "OP" | "STARK" | "USD";

export interface useCurrenciesOrderProps<T extends { currency: useCurrenciesOrderCurrency }> {
  currencies: T[] | undefined;
}

const order = ["USD", "ETH", "STARK", "OP", "APT"];

export function useCurrenciesOrder<T extends { currency: useCurrenciesOrderCurrency }>({
  currencies,
}: useCurrenciesOrderProps<T>): T[] {
  const sortedCurrencies = useMemo(
    () =>
      [...(currencies || [])].sort((a: T, b: T) => {
        return order.indexOf(a.currency) - order.indexOf(b.currency);
      }),
    [currencies]
  );

  return sortedCurrencies;
}
