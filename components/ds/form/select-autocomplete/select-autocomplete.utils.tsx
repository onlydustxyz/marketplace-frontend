import { isArray } from "lodash";

import { TSelectAutocomplete } from "./select-autocomplete.types";

export namespace SelectAutocompleteUtils {
  export const isItemSelected = (
    selected: TSelectAutocomplete.Item[] | TSelectAutocomplete.Item,
    item: TSelectAutocomplete.Item
  ) => {
    if (isArray(selected)) {
      return selected?.find(({ id }) => id === item.id);
    }

    return selected?.id === item.id;
  };
}
