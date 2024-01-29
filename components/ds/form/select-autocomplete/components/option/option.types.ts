import { TSelectAutocomplete } from "../../select-autocomplete.types";

export namespace TOption {
  export interface Props {
    item: TSelectAutocomplete.Item;
    active: boolean;
    selected: boolean;
    type: TSelectAutocomplete.avatarType;
  }
}
