import { components } from "src/__generated/api";

export type WorkEstimationBudgetDetails = components["schemas"]["BudgetResponse"];

export interface RewardBudgetChangeProps {
  currency: WorkEstimationBudgetDetails["currency"];
  amount: number;
}

export interface RewardBudgetProps {
  budgets: WorkEstimationBudgetDetails[];
  preferedCurrency?: WorkEstimationBudgetDetails["currency"] | undefined;
  initialDollarsEquivalent?: number;
  remainingDollarsEquivalent?: number;
  onChange?: (props: RewardBudgetChangeProps) => void;
}
