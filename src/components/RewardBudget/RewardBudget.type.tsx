import { components } from "src/__generated/api";

export type WorkEstimationBudgetDetails = components["schemas"]["BudgetResponse"];

export interface RewardBudgetChangeProps {
  currency: WorkEstimationBudgetDetails["currency"];
  amount: number;
}

export interface RewardBudgetProps {
  budgets: WorkEstimationBudgetDetails[];
  preferedCurrency?: WorkEstimationBudgetDetails["currency"] | null;
  onChange?: (props: RewardBudgetChangeProps) => void;
  loading?: boolean;
}
