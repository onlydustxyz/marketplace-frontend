import { useState } from "react";

import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";
import { TUseCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter.types";

export function UseCurrencyConverter({ budgets }: TUseCurrencyConverter.Props) {
  const [usdValue, setUsdValue] = useState<string>("");
  const [currencyAmount, setCurrencyAmount] = useState<string>("");
  const [currencySelection, setCurrencySelection] = useState<TCurrencyConverter.CurrencyAmount["currency"] | undefined>(
    budgets?.[0].currency
  );
  const [currencyBudget, setCurrencyBudget] = useState<TCurrencyConverter.BudgetResponse | undefined>(budgets?.[0]);

  // const selectedCurrencyBudget = useMemo(
  //   () => budgets?.find(budget => budget.currency.code === currencySelection.code),
  //   [currencySelection]
  // );
  function convertValues({
    value,
    currency,
    isUSD,
  }: {
    value: string;
    currency?: TCurrencyConverter.CurrencyAmount["currency"];
    isUSD: boolean;
  }) {
    // const currencyBudget = budgets?.find(budget => budget.currency.code === currency?.code) || selectedCurrencyBudget;

    if (!value) {
      setUsdValue("");
      setCurrencyAmount("");
      return;
    }

    if (!currencyBudget) {
      return;
    }

    console.log("convert", currencyBudget.currency.code);

    const conversionRate = currencyBudget?.dollarsConversionRate || 1;
    const decimals = currencyBudget?.currency.decimals;

    if (isUSD) {
      const convertedCurrencyValue = parseFloat(value) / conversionRate;
      setUsdValue(value);
      setCurrencyAmount(convertedCurrencyValue.toFixed(decimals));
    } else {
      const convertedUsdValue = parseFloat(value) * conversionRate;
      setCurrencyAmount(value);
      setUsdValue(convertedUsdValue.toFixed(2));
    }
  }

  function handleSetUsdValue(value: string) {
    convertValues({ value, isUSD: true, currency: currencyBudget?.currency });
  }

  function handleSetCurrencyAmount(amount: TCurrencyConverter.CurrencyAmount["amount"]) {
    convertValues({ value: amount, isUSD: false });
  }
  function handleSetCurrencySelection(currency: TCurrencyConverter.CurrencyAmount["currency"]) {
    if (currency) {
      setCurrencySelection(currency);
      setCurrencyBudget(budgets?.find(budget => budget.currency.code === currency.code));
      convertValues({ value: usdValue, isUSD: true, currency });
    }
  }

  return {
    currencyBudget,
    usdValue,
    currencyAmount,
    currencySelection,
    setUsdValue,
    handleSetUsdValue,
    handleSetCurrencyAmount,
    handleSetCurrencySelection,
  };
}
