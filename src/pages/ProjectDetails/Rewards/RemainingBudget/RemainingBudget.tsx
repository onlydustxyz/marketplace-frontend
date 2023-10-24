import { components } from "src/__generated/api";
import { BudgetCard } from "./BudgetCard";
import { TotalBudgetCard } from "./TotalBudgetCard";

export type ProjectBudgetType = components["schemas"]["ProjectBudgetsResponse"];

type RemainingBudgetProps = {
  projectBudget: ProjectBudgetType;
};

export function RemainingBudget({ projectBudget }: RemainingBudgetProps) {
  return (
    <div className="flex w-full flex-wrap gap-4">
      <TotalBudgetCard
        budget={{
          initialAmount: projectBudget.initialDollarsEquivalent || 0,
          remaining: projectBudget.remainingDollarsEquivalent || 0,
        }}
        className="md:basis-[calc(50%-.50rem)] lg:basis-[calc(25%-.75rem)]"
      />

      {projectBudget.budgets.slice(0, 3).map(budget => {
        return (
          <BudgetCard
            key={budget.currency}
            budget={budget}
            className="md:basis-[calc(50%-.50rem)] lg:basis-[calc(25%-.75rem)]"
          />
        );
      })}
    </div>
  );
}
