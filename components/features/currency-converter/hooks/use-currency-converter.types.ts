import { Money } from "utils/Money/Money";

import { TCurrencyConverter } from "components/features/currency-converter/currency-converter.types";

export namespace TUseCurrencyConverter {
  export interface CurrencyAmount {
    amount: string;
    currency: Money.Currency;
  }
  export interface Props {
    budgets?: TCurrencyConverter.BudgetResponse[];
  }
}
