import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TFiltersTechnologies {
  export interface Props {
    technologies: TSelectAutocomplete.Item[];
    selected: TSelectAutocomplete.Item[];
    onChange: (technologies: TSelectAutocomplete.Item[]) => void;
  }
}
