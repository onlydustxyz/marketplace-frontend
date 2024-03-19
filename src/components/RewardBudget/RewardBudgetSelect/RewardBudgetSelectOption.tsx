import { Listbox } from "@headlessui/react";
import { useMemo } from "react";
import { Money } from "utils/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { WorkEstimationBudgetDetails } from "src/components/RewardBudget/RewardBudget.type";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

export interface RewardBudgetSelectOptionProps {
  budget: WorkEstimationBudgetDetails;
  last: boolean;
  active: boolean;
}

export const RewardBudgetSelectOption = ({ budget, last, active }: RewardBudgetSelectOptionProps) => {
  const { T } = useIntl();

  const isDisabled = useMemo(() => budget.remaining <= 0, [budget]);

  return (
    <Listbox.Option
      key={budget.currency.id}
      disabled={isDisabled}
      value={budget}
      className={cn("cursor-pointer border-b border-greyscale-50/12 px-4 py-2.5 hover:bg-greyscale-50/20", {
        "border-b-0": last,
        "pointer-events-none": isDisabled,
      })}
    >
      <div className="flex w-auto min-w-full items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Chip solid>
            <CurrencyIcons currency={budget.currency} className="h-4 w-4" />
          </Chip>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span
              className={cn("font-walsheim text-sm font-normal leading-none", {
                "text-greyscale-500": isDisabled,
                "font-medium text-spacePurple-300": active,
              })}
            >
              {budget.currency.name}
            </span>

            <span
              className={cn("whitespace-nowrap font-walsheim text-xs font-normal leading-none text-spaceBlue-200", {
                "text-greyscale-500": isDisabled,
              })}
            >
              {`(${Money.format({ amount: budget.remaining, currency: budget.currency }).string})`}
            </span>
          </div>
        </div>
        {!Money.isUsd(budget.currency) && (
          <p
            className={cn("whitespace-nowrap font-walsheim text-xs font-normal text-spaceBlue-200", {
              "text-greyscale-500": isDisabled,
            })}
          >
            {budget.remainingDollarsEquivalent
              ? Money.format({
                  amount: budget.remainingDollarsEquivalent,
                  currency: Money.USD,
                  options: {
                    prefixAmountWithTilde: true,
                  },
                }).string
              : T("availableConversion.tooltip.na")}
          </p>
        )}
      </div>
    </Listbox.Option>
  );
};
