import React, { useMemo } from "react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { TCurrencyBudget } from "components/features/currency/currency-budget/currency-budget.types";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

function BudgetInfoRow({ label, amount, currency, isWarning }: TCurrencyBudget.BudgetInfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-1">
        {isWarning ? (
          <Tooltip content={<Translate token="v2.features.currency.budget.budgetExceeded" />}>
            <Icon remixName="ri-information-line" size={16} color="orange" />
          </Tooltip>
        ) : null}
        <Typography variant="body-s" className="line-clamp-1 text-greyscale-50">
          {label}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <Typography variant="body-s" className={cn("text-right text-greyscale-50", { "text-orange-500": isWarning })}>
          {Money.format({ amount, currency }).string}
        </Typography>
        <Chip solid className="h-5 w-5 flex-shrink-0">
          <CurrencyIcons currency={Money.fromSchema({ code: currency.code })} className="h-4 w-4" />
        </Chip>
      </div>
    </div>
  );
}

export function CurrencyBudget({ className, selectedBudget, rewardAmount }: TCurrencyBudget.CurrencyBudgetProps) {
  const { T } = useIntl();
  const rewardAmountParsed = useMemo(() => parseFloat(rewardAmount) || 0, [rewardAmount]);
  const budgetAfterReward = useMemo(() => {
    if (!selectedBudget) return 0;
    return selectedBudget.remaining - rewardAmountParsed;
  }, [selectedBudget, rewardAmountParsed]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Typography
        variant="body-s"
        className="uppercase text-spaceBlue-200"
        translate={{ token: "v2.features.currency.budget.title" }}
      />
      {selectedBudget && (
        <>
          <BudgetInfoRow
            label={T("v2.features.currency.budget.currentBudget")}
            amount={selectedBudget.remaining}
            currency={selectedBudget.currency}
          />
          <BudgetInfoRow
            label={T("v2.features.currency.budget.amountRewarded")}
            amount={rewardAmountParsed}
            currency={selectedBudget.currency}
          />
          <BudgetInfoRow
            label={T("v2.features.currency.budget.budgetAfterReward")}
            amount={budgetAfterReward}
            currency={selectedBudget.currency}
            isWarning={budgetAfterReward < 0}
          />
        </>
      )}
    </div>
  );
}
