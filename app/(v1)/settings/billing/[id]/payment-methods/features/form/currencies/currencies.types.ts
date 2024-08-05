import { Money } from "utils/Money/Money";

export namespace TCurrencies {
  export interface Props {
    currencies: Money.Static.Currency[];
  }
}
