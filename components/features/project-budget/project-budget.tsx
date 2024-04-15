import { useMemo } from "react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { TProjectBudget } from "components/features/project-budget/project-budget.types";
import { Typography } from "components/layout/typography/typography";

function BudgetInfoRow({ label, amount, currency }: TProjectBudget.BudgetInfoRowProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <Typography variant="body-s" className="line-clamp-1 text-greyscale-50">
        {label}
      </Typography>
      <div className="flex flex-row items-center gap-2">
        <Typography variant="body-s" className="text-right text-greyscale-50">
          {Money.format({ amount, currency }).string}
        </Typography>
        <Chip solid className="h-5 w-5 flex-shrink-0">
          <CurrencyIcons currency={Money.fromSchema({ code: currency.code })} className="h-4 w-4" />
        </Chip>
      </div>
    </div>
  );
}

export function ProjectBudget({ selectedBudget, rewardAmount }: TProjectBudget.ProjectBudgetProps) {
  const rewardAmountParsed = useMemo(() => parseFloat(rewardAmount) || 0, [rewardAmount]);
  const budgetAfterReward = useMemo(() => {
    if (!selectedBudget) return 0;
    return selectedBudget.remaining - rewardAmountParsed;
  }, [selectedBudget, rewardAmountParsed]);

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="body-s" className="uppercase text-spaceBlue-200">
        Project Budget
      </Typography>
      {selectedBudget && (
        <>
          <BudgetInfoRow label="Current budget" amount={selectedBudget.remaining} currency={selectedBudget.currency} />
          <BudgetInfoRow label="Amount rewarded" amount={rewardAmountParsed} currency={selectedBudget.currency} />
          <BudgetInfoRow label="Budget after reward" amount={budgetAfterReward} currency={selectedBudget.currency} />
        </>
      )}
    </div>
  );
}
