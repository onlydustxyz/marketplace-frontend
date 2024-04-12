import { components } from "src/__generated/api";

export namespace TCurrencyConverter {
  export type BudgetResponse = components["schemas"]["BudgetResponse"];

  export interface Props {
    budgets: BudgetResponse[];
    value: BudgetResponse;
    onChange: (value: BudgetResponse) => void;
  }
}
