import { Money } from "utils/Money/Money";

import { components } from "src/__generated/api";

export namespace TCurrencyConverter {
  export type BudgetResponse = components["schemas"]["BudgetResponse"];

  export interface CurrencyAmount {
    amount: string;
    currency: Money.Currency;
  }

  export interface Props {
    budgets: BudgetResponse[];
    onChange: (value: TCurrencyConverter.CurrencyAmount) => void;
  }
}
