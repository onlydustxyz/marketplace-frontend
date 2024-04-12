import { TInput } from "components/ds/form/input/input.types";
import { TCurrencyConverter } from "components/features/currency-converter/currency-converter.types";
import { TUseCurrencyConverter } from "components/features/currency-converter/hooks/use-currency-converter.types";

export namespace TAmountSelect {
  export interface Props {
    inputProps?: TInput.Props;
    budgets: TCurrencyConverter.BudgetResponse[];
    value: TUseCurrencyConverter.CurrencyAmount;
    onChange: (value: TUseCurrencyConverter.CurrencyAmount) => void;
    onFocus: (isOnFocus: boolean) => void;
  }
}
