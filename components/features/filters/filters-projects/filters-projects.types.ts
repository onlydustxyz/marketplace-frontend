import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersProjects {
  export interface Props {
    projects: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (projects: TSelectAutocomplete.Item[]) => void;
  }
}
