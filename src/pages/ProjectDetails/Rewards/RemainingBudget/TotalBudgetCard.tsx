import InfoIcon from "src/assets/icons/InfoIcon";
import Card from "src/components/Card";
import { withTooltip } from "src/components/Tooltip";
import { Currency } from "src/types";
import { cn } from "src/utils/cn";
import { formatMoneyAmount } from "src/utils/money";
import { LeftToSpend } from "./LeftToSpend";
import { useIntl } from "src/hooks/useIntl";
import RewardBudgetBar from "src/components/RewardBudget/BudgetBar/RewardBudgetBar";

interface Props {
  budget: { initialAmount: number; remaining: number };
  className?: string;
}

export function TotalBudgetCard({ budget, className }: Props) {
  const { T } = useIntl();

  return (
    <Card className={cn("bg-budget bg-origin-border p-8", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm text-white">
          <span className="mr-2" {...withTooltip(T("project.details.remainingBudget.usdInfoBudgets"))}>
            <InfoIcon />
          </span>

          {T("project.details.remainingBudget.budget.total")}
        </div>
        <div className="flex flex-wrap items-center font-belwe text-2xl text-greyscale-50">
          {formatMoneyAmount({ amount: budget.initialAmount, currency: Currency.USD })}
        </div>
        <div className="flex items-center gap-2">
          <RewardBudgetBar total={budget.initialAmount} remaining={budget.remaining} spending={0} />
          <LeftToSpend budget={budget} />
        </div>
      </div>
    </Card>
  );
}
