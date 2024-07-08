import { PropsWithChildren } from "react";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TOptions {
  export interface Props extends PropsWithChildren {
    selectedItems: TSelectAutocomplete.Item[];
    filteredItems: TSelectAutocomplete.Item[];
    type: TSelectAutocomplete.avatarType;
    emptyMessage?: string;
    query?: string;
    onNextPage?: () => void;
    loadingNextPage?: boolean;
    suggestAction?: TSelectAutocomplete.Props<unknown>["suggestAction"];
  }
}
