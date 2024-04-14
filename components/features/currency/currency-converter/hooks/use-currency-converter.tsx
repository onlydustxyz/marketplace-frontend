import { useEffect, useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";
import { TUseCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter.types";

export function UseCurrencyConverter({ budgets }: TUseCurrencyConverter.Props) {
  const [usdValue, setUsdValue] = useState<string>("");
  const [currencyValue, setCurrencyValue] = useState<TCurrencyConverter.CurrencyAmount>({
    amount: "",
    currency: Money.fromSchema({ code: Money.Static.Currency.OP }),
  });

  const [isUsdFieldOnFocus, setIsUsdFieldOnFocus] = useState<boolean>(false);
  const [isCurrencyFieldOnFocus, setIsCurrencyFieldOnFocus] = useState<boolean>(false);
  const [isCurrencySelectOnFocus, setIsCurrencySelectOnFocus] = useState<boolean>(false);

  const selectedCurrencyBudget = useMemo(
    () => budgets?.find(budget => budget.currency.code === currencyValue.currency.code),
    [currencyValue.currency]
  );
  function convertValues(value: string, isUSD: boolean) {
    console.log("convertValues", value);
    if (!selectedCurrencyBudget?.dollarsConversionRate) return;

    const conversionRate = selectedCurrencyBudget.dollarsConversionRate;
    const decimals = selectedCurrencyBudget.currency.decimals;

    if (isUSD) {
      const convertedCurrencyValue = parseFloat(value) / conversionRate;
      if (isNaN(convertedCurrencyValue)) {
        setCurrencyValue(prev => ({ ...prev, amount: "" }));
        return;
      }
      setCurrencyValue(prev => ({ ...prev, amount: convertedCurrencyValue.toFixed(decimals) }));
    } else {
      const convertedUsdValue = parseFloat(value) * conversionRate;
      if (isNaN(convertedUsdValue)) {
        setUsdValue("");
        return;
      }
      setUsdValue(convertedUsdValue.toFixed(2));
    }
  }

  useEffect(() => {
    if (!isCurrencyFieldOnFocus && !isCurrencySelectOnFocus) convertValues(usdValue, true);
  }, [usdValue]);

  useEffect(() => {
    if (!isUsdFieldOnFocus && !isCurrencySelectOnFocus) convertValues(currencyValue.amount, false);
  }, [currencyValue.amount]);

  useEffect(() => {
    if (!isUsdFieldOnFocus && !isCurrencyFieldOnFocus && isCurrencySelectOnFocus) convertValues(usdValue, true);
  }, [currencyValue.currency]);

  return {
    selectedCurrencyBudget,
    usdValue,
    currencyValue,
    isUsdFieldOnFocus,
    isCurrencyFieldOnFocus,
    isCurrencySelectOnFocus,
    setUsdValue,
    setCurrencyValue,
    setIsUsdFieldOnFocus,
    setIsCurrencyFieldOnFocus,
    setIsCurrencySelectOnFocus,
  };
}
