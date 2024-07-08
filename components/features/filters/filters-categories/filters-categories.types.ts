import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersCategories {
  export interface Props {
    categories: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (categories: TSelectAutocomplete.Item[]) => void;
    hideLabel?: boolean;
    hideIcon?: boolean;
    isBlueBackground?: boolean;
    multiple?: boolean;
  }
}
