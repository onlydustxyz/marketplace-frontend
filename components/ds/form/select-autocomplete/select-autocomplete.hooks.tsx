import { isArray } from "lodash";
import { useMemo, useState } from "react";

import { useIntl } from "hooks/translate/use-translate";

import { TSelectAutocomplete } from "./select-autocomplete.types";
import { SelectAutocompleteUtils as Utils } from "./select-autocomplete.utils";

export namespace SelectAutocompleteHooks {
  export const useTokens = (
    selected: TSelectAutocomplete.Item[] | TSelectAutocomplete.Item,
    items: TSelectAutocomplete.Item[],
    tokens: Record<"zero" | "other", string>
  ) => {
    const { T } = useIntl();

    return useMemo(() => {
      if (Array.isArray(selected)) {
        // Sometimes we have more items selected than items available in the list.
        // We need to filter to avoid showing "2 x selected" when there's only 1 item in the list for example.
        const filteredSelected = selected.filter(({ id }) => items.map(({ id }) => id).includes(id));

        return filteredSelected.length ? T(tokens.other, { count: filteredSelected.length }) : T(tokens.zero);
      }

      return selected?.label ?? T(tokens.zero);
    }, [selected, items, tokens, T]);
  };

  export const useFilteredItems = (
    selected: TSelectAutocomplete.Item[] | TSelectAutocomplete.Item,
    items: TSelectAutocomplete.Item[]
  ) => {
    const [query, setQuery] = useState<string>();

    const filteredItems = useMemo(() => {
      const queryItems = items.filter(item =>
        query?.length ? item.label?.toString()?.toLowerCase()?.includes(query?.toLowerCase()) : true
      );

      if (isArray(selected)) {
        return queryItems.filter(item => !Utils.isItemSelected(selected, item));
      }

      return queryItems;
    }, [items, query, selected]);

    return { filteredItems, query, setQuery };
  };
  export const useSelectedItems = (selected: TSelectAutocomplete.Item[] | TSelectAutocomplete.Item) => {
    return useMemo(() => {
      if (isArray(selected)) {
        return selected;
      }

      return [selected];
    }, [selected]);
  };
}
