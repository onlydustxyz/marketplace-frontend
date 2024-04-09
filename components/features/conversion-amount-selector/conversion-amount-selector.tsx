import { useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import { Input } from "components/ds/form/input/input";
import { TConversionAmountSelector } from "components/features/conversion-amount-selector/conversion-amount-selector.types";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";

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
        onChange={e => handleQuery(e.target.value)}
        type="number"
        placeholder="0.00"
        size="lg"
        radius="full"
        className="h-11"
        value={amountValue}
      />
      <AmountSelect currencies={extractCurrencies} />
    </div>
  );
}
