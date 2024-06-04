import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersLanguages {
  export interface Props {
    languages: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (languages: TSelectAutocomplete.Item[]) => void;
  }
}
