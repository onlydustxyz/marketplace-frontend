import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersCurrencies {
  export interface Props {
    currencies: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (currencies: TSelectAutocomplete.Item[]) => void;
  }
}
