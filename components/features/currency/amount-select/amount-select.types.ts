import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";

import { TInput } from "components/ds/form/input/input.types";

export namespace TAmoutSelect {
  export interface Props {
    inputProps?: TInput.Props;
    currencies: ReturnType<typeof useCurrenciesOrder>;
  }
}
