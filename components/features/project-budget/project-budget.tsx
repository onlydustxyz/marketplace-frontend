import { useMemo } from "react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { TProjectBudget } from "components/features/project-budget/project-budget.types";
import { Typography } from "components/layout/typography/typography";

export function ProjectBudget({ selectedBudget, rewardAmount }: TProjectBudget.Props) {
  const budgetAfterReward = useMemo(() => {
    if (!selectedBudget || isNaN(parseFloat(rewardAmount))) return 0;
    return selectedBudget?.remaining - parseFloat(rewardAmount);
  }, [selectedBudget, rewardAmount]);

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="body-s" className="uppercase text-spaceBlue-200">
        Project Budget
      </Typography>
      <div className="flex flex-row justify-between">
        <Typography variant="body-s" className="text-greyscale-50">
          Current budget
        </Typography>
        <div className="flex flex-row items-center gap-2">
          <Typography variant="body-s" className="text-greyscale-50">
            {
              Money.format({
                amount: selectedBudget?.remaining,
                currency: selectedBudget?.currency,
              }).string
            }
          </Typography>
          <Chip solid className="h-5 w-5 flex-shrink-0">
            <CurrencyIcons currency={Money.fromSchema({ code: selectedBudget?.currency.code })} className="h-4 w-4" />
          </Chip>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Typography variant="body-s" className="text-greyscale-50">
          Amount rewarded
        </Typography>
        <div className="flex flex-row items-center gap-2">
          <Typography variant="body-s" className="text-greyscale-50">
            {
              Money.format({
                amount: isNaN(parseFloat(rewardAmount)) ? 0 : parseFloat(rewardAmount),
                currency: selectedBudget?.currency,
              }).string
            }
          </Typography>
          <Chip solid className="h-5 w-5 flex-shrink-0">
            <CurrencyIcons currency={Money.fromSchema({ code: selectedBudget?.currency.code })} className="h-4 w-4" />
          </Chip>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Typography variant="body-s" className="text-greyscale-50">
          Budget after reward
        </Typography>
        <div className="flex flex-row items-center gap-2">
          <Typography variant="body-s" className="text-greyscale-50">
            {
              Money.format({
                amount: budgetAfterReward,
                currency: selectedBudget?.currency,
              }).string
            }
          </Typography>
          <Chip solid className="h-5 w-5 flex-shrink-0">
            <CurrencyIcons currency={Money.fromSchema({ code: selectedBudget?.currency.code })} className="h-4 w-4" />
          </Chip>
        </div>
      </div>
    </div>
  );
}
