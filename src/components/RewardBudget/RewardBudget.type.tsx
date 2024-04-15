import { Money } from "utils/Money/Money";

import { components } from "src/__generated/api";

export type WorkEstimationBudgetDetails = components["schemas"]["BudgetResponse"];

export interface RewardBudgetChangeProps {
  currency?: Money.Currency;
  amount?: number;
}

export interface RewardBudgetProps {
  budgets: WorkEstimationBudgetDetails[];
  preferedCurrency?: WorkEstimationBudgetDetails["currency"] | null;
  onChange?: (props: RewardBudgetChangeProps) => void;
  loading?: boolean;
}
