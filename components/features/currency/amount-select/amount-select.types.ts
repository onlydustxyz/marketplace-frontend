import { Money } from "utils/Money/Money";

import { TInput } from "components/ds/form/input/input.types";

export namespace TAmoutSelect {
  export interface Props {
    inputProps?: TInput.Props;
    currencies: Money.Currency[];
  }
}
