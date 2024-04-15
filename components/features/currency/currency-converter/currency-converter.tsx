import { useEffect } from "react";

import { IconTag } from "components/ds/icon-tag/icon-tag";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";
import { useCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter";
import { UsdInput } from "components/features/currency/usd-input/usd-input";

import { QuickValueButton } from "./components/quick-value-button";

export function CurrencyConverter({ budgets, onChange }: TCurrencyConverter.Props) {
  const {
    usdValue,
    currencyAmount,
    currencySelection,
    handleSetUsdValue,
    handleSetCurrencyAmount,
    handleSetCurrencySelection,
  } = useCurrencyConverter({
    budgets,
  });

  useEffect(() => {
    if (currencyAmount) {
      onChange({ amount: currencyAmount });
    }
  }, [currencyAmount]);

  useEffect(() => {
    if (currencySelection) {
      onChange({ currency: currencySelection });
    }
  }, [currencySelection]);

  const quickValues = ["150", "500", "1000", "2000"];

  return (
    <div className="flex flex-col">
      <UsdInput value={usdValue} onChange={handleSetUsdValue} />
      <IconTag
        icon={{ remixName: "ri-arrow-down-line" }}
        className="relative z-10 m-auto -my-2 bg-whiteFakeOpacity-2 text-spaceBlue-400"
      />
      {currencySelection && (
        <AmountSelect
          budgets={budgets}
          amountValue={currencyAmount}
          selectionValue={currencySelection}
          onAmountChange={handleSetCurrencyAmount}
          onSelectionChange={handleSetCurrencySelection}
        />
      )}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {quickValues.map(value => (
          <QuickValueButton key={value} value={value} currentUsdValue={usdValue} onSetUsdValue={handleSetUsdValue} />
        ))}
      </div>
    </div>
  );
}
