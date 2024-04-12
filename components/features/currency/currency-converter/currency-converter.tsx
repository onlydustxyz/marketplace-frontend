import { useEffect } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";
import { UseCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter";
import { UsdInput } from "components/features/currency/usd-input/usd-input";
import { Translate } from "components/layout/translate/translate";

export function CurrencyConverter({ budgets, onChange }: TCurrencyConverter.Props) {
  const { usdValue, setUsdValue, currencyValue, setCurrencyValue, setIsCurrencyFieldOnFocus, setIsUsdFieldOnFocus } =
    UseCurrencyConverter({
      budgets,
    });

  useEffect(() => {
    onChange(currencyValue);
  }, [currencyValue]);

  return (
    <div className="flex flex-col">
      <UsdInput value={usdValue} onChange={setUsdValue} onFocus={setIsUsdFieldOnFocus} />
      <IconTag
        icon={{ remixName: "ri-arrow-down-line" }}
        className="relative z-10 m-auto -my-2 bg-whiteFakeOpacity-2 text-spaceBlue-400"
      />
      <AmountSelect
        budgets={budgets}
        value={currencyValue}
        onChange={setCurrencyValue}
        onFocus={setIsCurrencyFieldOnFocus}
      />
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Button
          variant="secondary"
          onClick={() => setUsdValue("150")}
          size="s"
          className={cn("w-full border border-greyscale-50/8", {
            "border-spacePurple-500": parseFloat(usdValue) === 150,
          })}
        >
          <Translate token="v2.features.currencyConverter.quickValues.150Usd" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => setUsdValue("500")}
          size="s"
          className={cn("w-full border border-greyscale-50/8", {
            "border-spacePurple-500": parseFloat(usdValue) === 500,
          })}
        >
          <Translate token="v2.features.currencyConverter.quickValues.500Usd" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => setUsdValue("1000")}
          size="s"
          className={cn("w-full border border-greyscale-50/8", {
            "border-spacePurple-500": parseFloat(usdValue) === 1000,
          })}
        >
          <Translate token="v2.features.currencyConverter.quickValues.1000Usd" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => setUsdValue("2000")}
          size="s"
          className={cn("w-full border border-greyscale-50/8", {
            "border-spacePurple-500": parseFloat(usdValue) === 2000,
          })}
        >
          <Translate token="v2.features.currencyConverter.quickValues.2000Usd" />
        </Button>
      </div>
    </div>
  );
}
