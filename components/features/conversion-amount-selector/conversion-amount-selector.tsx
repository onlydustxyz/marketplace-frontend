import { useState } from "react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";

import { Input } from "components/ds/form/input/input";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TConversionAmountSelector } from "components/features/conversion-amount-selector/conversion-amount-selector.types";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";

export function ConversionAmountSelector({ budgets, value, onChange }: TConversionAmountSelector.Props) {
  const [amountValue, setAmountValue] = useState("");
  function handleQuery(value: string) {
    setAmountValue(value);
  }

  const orderedCurrencies = useCurrenciesOrder({ currencies: budgets });

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
        onChange={e => handleQuery(e.target.value)}
        type="number"
        placeholder="0.00"
        size="lg"
        radius="full"
        className="h-11"
        value={amountValue}
      />
      <IconTag
        icon={{ remixName: "ri-arrow-down-line" }}
        className="relative z-10 m-auto -my-2 bg-whiteFakeOpacity-2 text-spaceBlue-400"
      />
      <AmountSelect currencies={orderedCurrencies} />
    </div>
  );
}
