import { useMemo } from "react";

import { CurrencyOrder, CurrencyUnion } from "src/types";

export type useCurrenciesOrderCurrency = CurrencyUnion;

export interface useCurrenciesOrderProps<T extends { currency: useCurrenciesOrderCurrency }> {
  currencies: T[] | undefined;
}

const order = CurrencyOrder;

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
