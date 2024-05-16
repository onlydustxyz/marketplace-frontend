import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersEcosystems {
  export interface Props {
    ecosystems: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (projects: TSelectAutocomplete.Item[]) => void;
    hideLabel?: boolean;
    hideIcon?: boolean;
    isBlueBackground?: boolean;
    multiple?: boolean;
  }
}
