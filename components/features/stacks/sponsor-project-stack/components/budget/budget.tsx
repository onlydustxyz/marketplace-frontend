import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { cn } from "src/utils/cn";

import { TBudget } from "components/features/stacks/sponsor-project-stack/components/budget/budget.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function Budget({ label, amount, currency, isAllocation }: TBudget.Props) {
  return (
    <li className={"flex items-center justify-between"}>
      <Typography variant={"body-s"}>
        <Translate token={label} />
      </Typography>
      <div className={"flex items-center gap-2"}>
        <Typography
          variant={"body-m"}
          className={cn({
            "text-github-green-light": isAllocation,
          })}
        >
          {`${isAllocation ? "+" : ""}${
            Money.format({
              amount,
              currency,
              options: { showCurrency: false },
            }).string
          }`}
        </Typography>
        <Chip solid className="h-5 w-5">
          <CurrencyIcons currency={currency} className="h-5 w-5" />
        </Chip>
      </div>
    </li>
  );
}
