import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TProjectCategoriesSelect {
  export interface Props {
    canSuggest?: boolean;
    name: string;
    categories: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    suggested: string[];
    onChange: (categories: TSelectAutocomplete.Item[]) => void;
    onChangeSuggestion?: (suggestion: string[]) => void;
  }
}
