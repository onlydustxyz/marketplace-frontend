import { useMemo } from "react";
import { Money } from "utils/Money";

import { CurrencyOrder, CurrencyUnion } from "src/types";

export type useCurrenciesOrderCurrency = CurrencyUnion;

export interface useCurrenciesOrderProps<T extends { currency: Money.Currency }> {
  currencies: T[] | undefined;
}

const order = CurrencyOrder;

export function useCurrenciesOrder<T extends { currency: Money.Currency }>({
  currencies,
}: useCurrenciesOrderProps<T>): T[] {
  const sortedCurrencies = useMemo(
    () =>
      [...(currencies || [])].sort((a: T, b: T) => {
        return order.indexOf(a.currency.code) - order.indexOf(b.currency.code);
      }),
    [currencies]
  );

  return sortedCurrencies;
}
