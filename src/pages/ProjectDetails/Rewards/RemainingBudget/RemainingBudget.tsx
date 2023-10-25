import { components } from "src/__generated/api";
import { BudgetCard } from "./BudgetCard";
import { TotalBudgetCard } from "./TotalBudgetCard";

export type ProjectBudgetType = components["schemas"]["ProjectBudgetsResponse"];

type RemainingBudgetProps = {
  projectBudget: ProjectBudgetType;
};

export function RemainingBudget({ projectBudget }: RemainingBudgetProps) {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TotalBudgetCard
        budget={{
          initialAmount: projectBudget.initialDollarsEquivalent || 0,
          remaining: projectBudget.remainingDollarsEquivalent || 0,
        }}
      />

      {projectBudget.budgets.slice(0, 3).map(budget => {
        return <BudgetCard key={budget.currency} budget={budget} />;
      })}
    </div>
  );
}
