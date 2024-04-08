import { useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import { Input } from "components/ds/form/input/input";
import { TConversionAmountSelector } from "components/features/conversion-amount-selector/conversion-amount-selector.types";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { Icon } from "components/layout/icon/icon";

export function ConversionAmountSelector({ budgets, value, onChange }: TConversionAmountSelector.Props) {
  const [amountValue, setAmountValue] = useState("");
  function handleQuery(value: string) {
    setAmountValue(value);
  }

  const extractCurrencies: Money.Currency[] = useMemo(() => {
    if (!budgets) return [];
    return budgets?.map(budget => budget.currency);
  }, [budgets]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        endContent={<Icon remixName="ri-arrow-down-s-line" className="pointer-events-none" />}
        onChange={e => handleQuery(e.target.value)}
        className="relative z-30 flex w-full flex-col"
        value={amountValue}
        placeholder="placeholder todo"
      />
      <AmountSelect currencies={extractCurrencies} />
    </div>
  );
}
