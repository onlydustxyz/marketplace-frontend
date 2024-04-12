import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TCurrencyConverter } from "components/features/currency-converter/currency-converter.types";
import { UseCurrencyConverter } from "components/features/currency-converter/hooks/use-currency-converter";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { UsdInput } from "components/features/usd-input/usd-input";

export function CurrencyConverter({ budgets, value, onChange }: TCurrencyConverter.Props) {
  const { usdValue, setUsdValue, currencyValue, setCurrencyValue, setIsCurrencyFieldOnFocus, setIsUsdFieldOnFocus } =
    UseCurrencyConverter({
      budgets,
    });

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
    </div>
  );
}
