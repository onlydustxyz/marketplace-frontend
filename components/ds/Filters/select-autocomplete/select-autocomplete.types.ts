import { ReactElement } from "react";

export namespace TSelectAutocomplete {
  export type Item = {
    id: number | string;
    label?: string | JSX.Element;
    value?: string;
    image?: string | null;
  };

  export type BaseProps<T> = {
    disabled?: boolean;
    icon?: ({ selected, className }: { selected: T | T[]; className: string }) => ReactElement;
    items: T[];
    tokens: Record<"zero" | "other", string>;
    type: "project" | "user";
  };

  export type SingleProps<T> = BaseProps<T> & {
    multiple?: never;
    onChange?: (value: T) => void;
    selected: T;
  };

  export type MultipleProps<T> = BaseProps<T> & {
    multiple?: true;
    onChange?: (value: T[]) => void;
    selected: T[];
  };

  export type Props<T> = SingleProps<T> | MultipleProps<T>;
}
