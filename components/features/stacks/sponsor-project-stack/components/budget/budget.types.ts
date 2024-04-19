import { Money } from "utils/Money/Money";

import { Key } from "src/hooks/useIntl";

export namespace TBudget {
  export interface Props {
    label: Key;
    amount: number;
    currency: Money.Currency;
    prefix?: string;
    color?: "green" | "orange";
  }
}
