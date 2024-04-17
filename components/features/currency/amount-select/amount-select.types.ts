import { Money } from "utils/Money/Money";

import { TInput } from "components/ds/form/input/input.types";
import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";

export namespace TAmountSelect {
  export interface Props {
    inputProps?: TInput.Props;
    budgets: TCurrencyConverter.BudgetResponse[];
    amountValue: string;
    selectionValue: Money.Currency;
    onAmountChange: (amount: string) => void;
    onSelectionChange: (currency: Money.Currency) => void;
  }
}
