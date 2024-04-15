import React, { useEffect } from "react";

import { cn } from "src/utils/cn";

import { IconTag } from "components/ds/icon-tag/icon-tag";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";
import { useCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter";
import { UsdInput } from "components/features/currency/usd-input/usd-input";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { QuickValueButton } from "./components/quick-value-button";

export function CurrencyConverter({ className, budgets, onChange }: TCurrencyConverter.Props) {
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
    <div className={cn("flex flex-col gap-3", className)}>
      <Typography variant="body-s" className="uppercase text-spaceBlue-200">
        <Translate token={"v2.features.currency.converter.title"} />
      </Typography>
      <div>
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
      </div>
      <div className="grid grid-cols-4 gap-2">
        {quickValues.map(value => (
          <QuickValueButton key={value} value={value} currentUsdValue={usdValue} onSetUsdValue={handleSetUsdValue} />
        ))}
      </div>
    </div>
  );
}
