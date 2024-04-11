import { useEffect, useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";

import { Input } from "components/ds/form/input/input";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TConversionAmountSelector } from "components/features/conversion-amount-selector/conversion-amount-selector.types";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";

export function ConversionAmountSelector({ budgets, value, onChange }: TConversionAmountSelector.Props) {
  const [usdAmountValue, setUsdAmountValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState<TConversionAmountSelector.CurrencyAmount>({
    amount: "",
    currencyCode: Money.Static.Currency.OP,
  });

  const [isUsdAmountOnFocus, setIsUsdAmountOnFocus] = useState(false);
  function handleUsdAmount(value: string) {
    setUsdAmountValue(value);
    if (parseFloat(value) === 0) {
      setCurrencyValue({ amount: "", currencyCode: currencyValue.currencyCode });
    }
    if (isUsdAmountOnFocus && selectedCurrencyBudget?.dollarsConversionRate) {
      const convertedCurrencyValue = parseFloat(usdAmountValue) / selectedCurrencyBudget.dollarsConversionRate;
      setCurrencyValue({
        amount: Money.format({
          amount: convertedCurrencyValue,
          currency: selectedCurrencyBudget.currency,
          options: { showCurrency: false },
        }).string,
        currencyCode: currencyValue.currencyCode,
      });
    }
  }

  function handleCurrencyValue(amount: string, currencyCode: Money.Static.Currency) {
    if (parseFloat(amount) === 0) {
      setUsdAmountValue("");
    }
    setCurrencyValue({ amount, currencyCode });
  }

  const orderedCurrencies = useCurrenciesOrder({ currencies: budgets });

  const selectedCurrencyBudget = useMemo(
    () => budgets.find(budget => budget.currency.code === currencyValue.currencyCode),
    [currencyValue.currencyCode]
  );

  useEffect(() => {
    if (currencyValue.amount && !isUsdAmountOnFocus && selectedCurrencyBudget?.dollarsConversionRate) {
      const convertedDollarValue = selectedCurrencyBudget.dollarsConversionRate * parseFloat(currencyValue.amount);
      setUsdAmountValue(
        Money.format({ amount: convertedDollarValue, currency: Money.USD, options: { showCurrency: false } }).string
      );
    }
  }, [currencyValue.amount]);

  useEffect(() => {
    if (usdAmountValue && !isUsdAmountOnFocus && selectedCurrencyBudget?.dollarsConversionRate) {
      const convertedCurrencyValue = parseFloat(usdAmountValue) / selectedCurrencyBudget.dollarsConversionRate;
      setCurrencyValue({
        amount: Money.format({
          amount: convertedCurrencyValue,
          currency: selectedCurrencyBudget.currency,
          options: { showCurrency: false },
        }).string,
        currencyCode: currencyValue.currencyCode,
      });
    }
  }, [currencyValue.currencyCode]);

  return (
    <div className="flex flex-col">
      <Input
        endContent={
          <div className="flex flex-row items-center gap-2">
            <Chip solid className="h-5 w-5 flex-shrink-0">
              <CurrencyIcons currency={Money.fromSchema({ code: Money.USD.code })} className="h-5 w-5" />
            </Chip>
            <label className="od-text-body-s">{Money.USD.code}</label>
          </div>
        }
        onChange={e => handleUsdAmount(e.target.value)}
        type="number"
        placeholder="0.00"
        size="lg"
        radius="full"
        className="h-11"
        value={usdAmountValue}
        onFocus={() => setIsUsdAmountOnFocus(true)}
        onBlur={() => setIsUsdAmountOnFocus(false)}
      />
      <IconTag
        icon={{ remixName: "ri-arrow-down-line" }}
        className="relative z-10 m-auto -my-2 bg-whiteFakeOpacity-2 text-spaceBlue-400"
      />
      <AmountSelect currencies={orderedCurrencies} value={currencyValue} onChange={handleCurrencyValue} />
    </div>
  );
}
