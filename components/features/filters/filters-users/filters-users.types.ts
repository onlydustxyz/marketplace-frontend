import { TSelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete.types";

export namespace TFiltersUsers {
  export interface Props {
    users: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (repos: TSelectAutocomplete.Item[]) => void;
    loadingNextPage?: boolean;
    onNextPage?: () => void;
    controlledSearch?: {
      value: string;
      onChange: (value: string) => void;
    };
  }
}
