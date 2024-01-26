import { PropsWithChildren } from "react";
import { TSelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete.types";

export namespace TOptions {
  export interface Props extends PropsWithChildren {
    selectedItems: TSelectAutocomplete.Item[];
    filteredItems: TSelectAutocomplete.Item[];
    type: TSelectAutocomplete.avatarType;
    emptyMessage?: string;
  }
}
