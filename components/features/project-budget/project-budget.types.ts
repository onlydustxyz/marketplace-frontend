import { Money } from "utils/Money/Money";

import { components } from "src/__generated/api";

export namespace TProjectBudget {
  export interface BudgetInfoRowProps {
    label: string;
    amount: number;
    currency: Money.Currency;
  }
  export interface ProjectBudgetProps {
    selectedBudget?: components["schemas"]["BudgetResponse"];
    rewardAmount: string;
  }
}
