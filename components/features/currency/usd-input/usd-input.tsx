import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { Input } from "components/ds/form/input/input";
import { TUsdInput } from "components/features/currency/usd-input/usd-input.types";

export function UsdInput({ inputProps, value, onChange }: TUsdInput.Props) {
  return (
    <Input
      endContent={
        <div className="flex flex-row items-center gap-2">
          <Chip solid className="h-5 w-5 flex-shrink-0">
            <CurrencyIcons currency={Money.fromSchema({ code: Money.USD.code })} className="h-5 w-5" />
          </Chip>
          <label className="od-text-body-s">{Money.USD.code}</label>
        </div>
      }
      onChange={e => onChange(e.target.value.replace(/[^0-9.,]+/g, "").replace(/,/g, "."))}
      type="text"
      placeholder="0.00"
      size="lg"
      radius="full"
      className="h-11"
      value={value}
      {...inputProps}
    />
  );
}
