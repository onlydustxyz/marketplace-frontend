import { Listbox } from "@headlessui/react";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useIntl } from "src/hooks/useIntl";
import { formatMoneyAmount } from "src/utils/money";
import { Currency } from "src/types";
import { cn } from "src/utils/cn";
import { WorkEstimationBudgetDetails } from "src/components/RewardBudget/RewardBudget.type";
import { Chip } from "src/components/Chip/Chip";

export interface RewardBudgetSelectOptionProps {
  budget: WorkEstimationBudgetDetails;
  last: boolean;
}

export const RewardBudgetSelectOption = ({ budget, last }: RewardBudgetSelectOptionProps) => {
  const { T } = useIntl();

  return (
    <Listbox.Option
      key={budget.currency}
      value={budget}
      className={cn(
        "cursor-pointer border-b-[1px] border-greyscale-50/12 px-4 py-2 hover:bg-greyscale-50/20",
        last && "border-b-0"
      )}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-start gap-3">
          <Chip solid>
            <CurrencyIcons currency={budget.currency} className="h-4 w-4" />
          </Chip>
          <p>
            <span className="font-walsheim text-sm font-normal">{T(`currencies.currency.${budget.currency}`)}</span>
            &nbsp;
            <span className="font-walsheim text-[10px] font-normal text-spaceBlue-200">
              {`(${formatMoneyAmount({ amount: budget.remaining, currency: budget.currency })})`}
            </span>
          </p>
        </div>
        {budget.currency !== Currency.USD && (
          <>
            {budget.remainingDollarsEquivalent ? (
              <p className="font-walsheim text-sm font-normal">
                {`(${formatMoneyAmount({
                  amount: budget.remainingDollarsEquivalent,
                  currency: Currency.USD,
                })})`}
              </p>
            ) : (
              T("availableConversion.tooltip.na")
            )}
          </>
        )}
      </div>
    </Listbox.Option>
  );
};
