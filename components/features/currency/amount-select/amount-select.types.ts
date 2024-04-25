import { Money } from "utils/Money/Money";

import { TInput } from "components/ds/form/input/input.types";

export namespace TAmountSelect {
  export interface Props {
    inputProps?: TInput.Props;
    budgets: { currency: Money.Currency }[];
    amountValue: string;
    selectionValue: Money.Currency;
    onAmountChange: (amount: string) => void;
    onSelectionChange: (currency: Money.Currency) => void;
  }
}
