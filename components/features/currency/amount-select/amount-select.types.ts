import { TInput } from "components/ds/form/input/input.types";
import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";

export namespace TAmountSelect {
  export interface Props {
    inputProps?: TInput.Props;
    budgets: TCurrencyConverter.BudgetResponse[];
    value: TCurrencyConverter.CurrencyAmount;
    onChange: (value: TCurrencyConverter.CurrencyAmount) => void;
    onFocus: (isOnFocus: boolean) => void;
  }
}
