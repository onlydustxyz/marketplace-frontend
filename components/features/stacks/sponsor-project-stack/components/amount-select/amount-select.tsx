import { Select, SelectItem } from "@nextui-org/react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { Input } from "components/ds/form/input/input";
import { Translate } from "components/layout/translate/translate";

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

export function AmountSelect() {
  const { T } = useIntl();

  return (
    <div className={"grid gap-5"}>
      <Input
        id={"sponsor-project-amount"}
        type="number"
        placeholder="0.00"
        size={"lg"}
        radius={"lg"}
        description={
          <div className={"od-text-body-s flex items-center justify-between"}>
            {
              Money.format({
                amount: 123123,
                currency: Money.USD,
                options: {
                  prefixAmountWithTilde: true,
                },
              }).html
            }
            <span>
              <Translate token="v2.pages.stacks.sponsorProject.amount.balance" />:{" "}
              {
                Money.format({
                  amount: 123123,
                  currency: Money.USD,
                }).string
              }
            </span>
          </div>
        }
        endContent={
          <div className="flex w-[150px] items-center">
            <Select
              aria-label={T("v2.pages.stacks.sponsorProject.amount.currency")}
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
      />
      <div className={"grid grid-cols-4 gap-3"}>
        <Button variant={"secondary"} size={"s"} className={"w-full"}>
          25%
        </Button>
        <Button variant={"secondary"} size={"s"} className={"w-full"}>
          50%
        </Button>
        <Button variant={"secondary"} size={"s"} className={"w-full"}>
          75%
        </Button>
        <Button variant={"secondary"} size={"s"} className={"w-full"}>
          100%
        </Button>
      </div>
    </div>
  );
}
