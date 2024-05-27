import { Money } from "utils/Money/Money";

import { components } from "src/__generated/api";

export namespace TCurrencyConverter {
  export type BudgetResponse = components["schemas"]["BudgetResponse"];

  export interface CurrencyAmount {
    amount?: string;
    amountInDollars?: string;
    currency?: Money.Currency;
  }

  export interface Props {
    className?: string;
    budgets: BudgetResponse[];
    onChange: (value: TCurrencyConverter.CurrencyAmount) => void;
  }
}
