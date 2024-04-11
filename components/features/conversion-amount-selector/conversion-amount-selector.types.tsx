import { Money } from "utils/Money/Money";

import { components } from "src/__generated/api";

export namespace TConversionAmountSelector {
  export type BudgetResponse = components["schemas"]["BudgetResponse"];

  export interface CurrencyAmount {
    amount: string | undefined;
    currencyCode: Money.Static.Currency;
  }
  export interface Props {
    budgets: BudgetResponse[];
    value: BudgetResponse;
    onChange: (value: BudgetResponse) => void;
  }
}
