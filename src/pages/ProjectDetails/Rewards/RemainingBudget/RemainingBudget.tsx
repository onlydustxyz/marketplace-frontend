import { components } from "src/__generated/api";
import { BudgetCard } from "./BudgetCard";
import { TotalBudgetCard } from "./TotalBudgetCard";

export type ProjectBudgetType = components["schemas"]["ProjectBudgetsResponse"];

type RemainingBudgetProps = {
  projectBudget: ProjectBudgetType;
};

export function RemainingBudget({ projectBudget }: RemainingBudgetProps) {
  console.log("projectBudget", projectBudget)

  const currencyOrder = ["USD", "ETH", "STARK", "OP", "APT"];

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
