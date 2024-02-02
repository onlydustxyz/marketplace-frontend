import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersRepos {
  export interface Props {
    repos: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (repos: TSelectAutocomplete.Item[]) => void;
  }
}
