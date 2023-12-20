import { components } from "src/__generated/api";
import { BudgetCard } from "./BudgetCard";
import { TotalBudgetCard } from "./TotalBudgetCard";
import Skeleton from "src/components/Skeleton";
import { CurrencyOrder } from "src/types";
import { useShowToaster } from "src/hooks/useToaster";
import ProjectApi from "src/api/Project";
import { useIntl } from "src/hooks/useIntl";

export type ProjectBudgetType = components["schemas"]["ProjectBudgetsResponse"];

type RemainingBudgetProps = {
  projectId: string;
};

export function RemainingBudget({ projectId }: RemainingBudgetProps) {
  const { T } = useIntl();
  const showToaster = useShowToaster();

  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
  } = ProjectApi.queries.useProjectBudget({
    params: { projectId },
  });

  if (isBudgetError) {
    showToaster(T("reward.budgets.error"), { isError: true });
  }

  if (isBudgetLoading) {
    return <Skeleton variant="projectRemainingBudgets" />;
  }

  if (!projectBudget) {
    return null;
  }

  const currencyOrder = CurrencyOrder;

  const sortedBudgets = projectBudget.budgets
    .filter(budget => currencyOrder.includes(budget.currency))
    .sort((a, b) => currencyOrder.indexOf(a.currency) - currencyOrder.indexOf(b.currency));

  const displayedBudgets = sortedBudgets.slice(0, 3);

  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TotalBudgetCard
        budget={{
          initialAmount: projectBudget.initialDollarsEquivalent || 0,
          remaining: projectBudget.remainingDollarsEquivalent || 0,
        }}
      />

      {displayedBudgets.map(budget => (
        <BudgetCard key={budget.currency} budget={budget} />
      ))}
    </div>
  );
}
