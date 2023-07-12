import { Link } from "react-router-dom";
import { ProjectPaymentsRoutePaths } from "src/App";
import Button, { ButtonSize, Width } from "src/components/Button";
import Card from "src/components/Card";
import CurrencyLine from "src/icons/CurrencyLine";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";
import BudgetBar from "src/pages/ProjectDetails/Payments/PaymentForm/WorkEstimation/BudgetBar";

interface Props {
  budget: { initialAmount: number; remainingAmount: number };
  disabled: boolean;
}

export default function RemainingBudget({ budget, disabled }: Props) {
  const { T } = useT();

  return (
    <Card className="p-8">
      <div className="flex flex-col">
        <div className="text-sm text-white">{T("project.details.remainingBudget.title")}</div>
        <div id="remainingBudget" className="font-belwe text-5xl text-greyscale-50">
          {formatMoneyAmount({ amount: budget.remainingAmount })}
        </div>
        <div className="pb-2 pt-4">
          <BudgetBar budget={budget} pendingSpending={0} displayPendingSpending={false} />
        </div>
        <div className="text-sm text-white">
          <span>{Math.round(budget.initialAmount ? (budget.remainingAmount / budget.initialAmount) * 100 : 0)}% </span>
          <span>{T("project.details.remainingBudget.leftToSpend")}</span>
        </div>
        {!disabled && (
          <Link to={ProjectPaymentsRoutePaths.New} className="pt-6">
            <Button width={Width.Full} size={ButtonSize.LgLowHeight}>
              <CurrencyLine />
              <span>{T("project.details.remainingBudget.newReward")}</span>
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
