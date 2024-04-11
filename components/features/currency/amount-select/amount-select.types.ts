import { Money } from "utils/Money/Money";

import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";

import { TInput } from "components/ds/form/input/input.types";
import { TConversionAmountSelector } from "components/features/conversion-amount-selector/conversion-amount-selector.types";

export namespace TAmountSelect {
  export interface Props {
    inputProps?: TInput.Props;
    currencies: ReturnType<typeof useCurrenciesOrder>;
    value: TConversionAmountSelector.CurrencyAmount;
    onChange?: (amount: string, currencyCode: Money.Static.Currency) => void;
  }
}
