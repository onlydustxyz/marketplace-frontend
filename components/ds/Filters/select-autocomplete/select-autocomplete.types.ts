import { ReactElement } from "react";

export namespace TSelectAutocomplete {
  export type Item = {
    id: number | string;
    label?: string | JSX.Element;
    value?: string;
    image?: string | null;
  };

  export type avatarType = "project" | "user";

  export type icon<T> = ({ selected, className }: { selected: T | T[]; className: string }) => ReactElement;

  export type BaseProps<T> = {
    disabled?: boolean;
    icon?: icon<T>;
    items: T[];
    tokens: Record<"zero" | "other", string>;
    type: avatarType;
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
