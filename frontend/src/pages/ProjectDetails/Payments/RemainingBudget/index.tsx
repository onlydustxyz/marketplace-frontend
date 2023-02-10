import { Link } from "react-router-dom";
import { ProjectPaymentsRoutePaths } from "src/App";
import Button, { ButtonSize, Width } from "src/components/Button";
import Card from "src/components/Card";
import CurrencyLine from "src/icons/CurrencyLine";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";
import BudgetBar from "../PaymentForm/WorkEstimation/BudgetBar";

interface Props {
  budget: { initialAmount: number; remainingAmount: number };
  disabled: boolean;
  onClickNewPayment__deprecated: () => void;
}

export default function RemainingBudget({ budget, disabled, onClickNewPayment__deprecated }: Props) {
  const { T } = useT();

  const sidebarUrlsEnabled = isFeatureEnabled(FeatureFlags.PROJECT_SIDEBAR_URLS);
  return (
    <Card className="p-8">
      <div className="flex flex-col">
        <div className="text-white text-sm">{T("project.details.remainingBudget.title")}</div>
        <div id="remainingBudget" className="text-5xl font-belwe text-greyscale-50">
          {formatMoneyAmount(budget.remainingAmount)}
        </div>
        <div className="pt-4 pb-2">
          <BudgetBar budget={budget} pendingSpending={0} displayPendingSpending={false} />
        </div>
        <div className="text-white text-sm">
          <span>{Math.round((budget.remainingAmount / budget.initialAmount) * 100)}% </span>
          <span>{T("project.details.remainingBudget.leftToSpend")}</span>
        </div>
        {!disabled && sidebarUrlsEnabled ? (
          <Link to={ProjectPaymentsRoutePaths.New} className="pt-6">
            <Button width={Width.Full} size={ButtonSize.LargeLowHeight}>
              <CurrencyLine />
              <span>{T("project.details.remainingBudget.newPayment")}</span>
            </Button>
          </Link>
        ) : (
          <div className="pt-6" onClick={onClickNewPayment__deprecated}>
            <Button width={Width.Full} size={ButtonSize.LargeLowHeight}>
              <CurrencyLine />
              <span>{T("project.details.remainingBudget.newPayment")}</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
