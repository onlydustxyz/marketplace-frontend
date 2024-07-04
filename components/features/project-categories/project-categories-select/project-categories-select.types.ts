import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TProjectCategoriesSelect {
  export interface Props {
    name: string;
    categories: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (projects: TSelectAutocomplete.Item[]) => void;
  }
}
