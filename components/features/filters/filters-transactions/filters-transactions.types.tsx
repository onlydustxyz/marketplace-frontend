import { TFilterFieldContainer } from "components/ds/Filters/field-container/field-container.types";
import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersTransactions {
  export interface Props extends Pick<TFilterFieldContainer.Props, "hideLabel"> {
    transactions: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (projects: TSelectAutocomplete.Item[]) => void;
    isElevated?: boolean;
  }
}
