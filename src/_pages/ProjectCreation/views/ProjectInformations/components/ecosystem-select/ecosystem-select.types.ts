import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TEcosystemSelect {
  export interface Props {
    name: string;
    ecosystems: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (projects: TSelectAutocomplete.Item[]) => void;
  }
}
