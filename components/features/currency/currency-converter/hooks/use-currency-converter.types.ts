import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";

export namespace TUseCurrencyConverter {
  export interface Props {
    budgets?: TCurrencyConverter.BudgetResponse[];
  }
}
