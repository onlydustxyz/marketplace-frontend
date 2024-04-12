import { TCurrencyConverter } from "components/features/currency-converter/currency-converter.types";

export namespace TUseCurrencyConverter {
  export interface Props {
    budgets?: TCurrencyConverter.BudgetResponse[];
  }
}
