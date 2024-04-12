import { useEffect, useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import { TUseCurrencyConverter } from "components/features/currency-converter/hooks/use-currency-converter.types";

export function UseCurrencyConverter({ budgets }: TUseCurrencyConverter.Props) {
  const [usdValue, setUsdValue] = useState<string>("");
  const [currencyValue, setCurrencyValue] = useState<TUseCurrencyConverter.CurrencyAmount>({
    amount: "",
    currency: Money.fromSchema({ code: Money.Static.Currency.OP }),
  });

  const [isUsdFieldOnFocus, setIsUsdFieldOnFocus] = useState<boolean>(false);
  const [isCurrencyFieldOnFocus, setIsCurrencyFieldOnFocus] = useState<boolean>(false);

  const selectedCurrencyBudget = useMemo(
    () => budgets?.find(budget => budget.currency.code === currencyValue.currency.code) || null,
    [currencyValue.currency]
  );
  function convertValues(value: string, isUSD: boolean) {
    if (!selectedCurrencyBudget?.dollarsConversionRate) return;

    const conversionRate = selectedCurrencyBudget.dollarsConversionRate;
    const decimals = selectedCurrencyBudget.currency.decimals;

    if (isUSD) {
      const convertedCurrencyValue = parseFloat(value) / conversionRate;
      setCurrencyValue(prev => ({ ...prev, amount: convertedCurrencyValue.toFixed(decimals) }));
    } else {
      const convertedUsdValue = parseFloat(value) * conversionRate;
      setUsdValue(convertedUsdValue.toFixed(2));
    }
  }

  useEffect(() => {
    if (!isCurrencyFieldOnFocus) convertValues(usdValue, true);
  }, [usdValue]);

  useEffect(() => {
    if (!isUsdFieldOnFocus) convertValues(currencyValue.amount, false);
  }, [currencyValue.amount]);

  useEffect(() => {
    convertValues(usdValue, true);
  }, [currencyValue.currency]);

  return {
    selectedCurrencyBudget,
    usdValue,
    currencyValue,
    isUsdFieldOnFocus,
    isCurrencyFieldOnFocus,
    setUsdValue,
    setCurrencyValue,
    setIsUsdFieldOnFocus,
    setIsCurrencyFieldOnFocus,
  };
}
