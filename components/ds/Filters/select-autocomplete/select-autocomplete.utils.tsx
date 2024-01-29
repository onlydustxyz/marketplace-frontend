import { TSelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete.types";
import { isArray } from "lodash";

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
