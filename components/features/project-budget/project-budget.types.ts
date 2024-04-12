import { components } from "src/__generated/api";

export namespace TProjectBudget {
  export interface Props {
    selectedBudget?: components["schemas"]["BudgetResponse"];
    rewardAmount: string;
  }
}
