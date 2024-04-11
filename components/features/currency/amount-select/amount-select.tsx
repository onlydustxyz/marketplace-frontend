import { Select, SelectItem } from "@nextui-org/react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useIntl } from "src/hooks/useIntl";

import { Input } from "components/ds/form/input/input";
import { TAmoutSelect } from "components/features/currency/amount-select/amount-select.types";

const items = [
  {
    label: "Dollars (USD)",
    value: "USD",
  },
  {
    label: "Aptos (APT)",
    value: "APT",
  },
  {
    label: "Optimism (OP)",
    value: "OP",
  },
  {
    label: "Ether (ETH)",
    value: "ETH",
  },
  {
    label: "Stark (STRK)",
    value: "STRK",
  },
] as const;

// TODO handle blue style
// TODO handle dynamic select items
export function AmountSelect({ inputProps }: TAmoutSelect.Props) {
  const { T } = useIntl();

  return (
    <Input
      type="number"
      placeholder="0.00"
      size={"lg"}
      radius={"lg"}
      endContent={
        <div className="flex w-[260px] items-center">
          <Select
            aria-label={T("v2.commons.currency")}
            startContent={
              <Chip solid className="h-5 w-5 flex-shrink-0">
                <CurrencyIcons currency={Money.fromSchema({ code: "USD" })} className="h-5 w-5" />
              </Chip>
            }
            defaultSelectedKeys={["OP"]}
            classNames={{
              trigger: "p-0 h-auto !bg-transparent shadow-none",
              innerWrapper: "!pt-0",
              popoverContent: "bg-greyscale-900 border border-card-border-light shadow-medium",
            }}
          >
            {items.map(({ value, label }) => (
              <SelectItem
                key={value}
                value={value}
                className={
                  "rounded-md p-2 data-[hover=true]:bg-card-background-medium data-[selectable=true]:focus:bg-card-background-medium"
                }
                startContent={
                  <Chip solid className="h-5 w-5">
                    <CurrencyIcons currency={Money.fromSchema({ code: value })} className="h-5 w-5" />
                  </Chip>
                }
              >
                {label}
              </SelectItem>
            ))}
          </Select>
        </div>
      }
      {...inputProps}
    />
  );
}
