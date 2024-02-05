import { TSelectAutocomplete } from "../../select-autocomplete.types";

export namespace TButton {
  export interface Props<T> {
    icon?: TSelectAutocomplete.icon<T>;
    selected: T | T[];
    token: string | JSX.Element;
    query?: string;
    open: boolean;
  }
}
