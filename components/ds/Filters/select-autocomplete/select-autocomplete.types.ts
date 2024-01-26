import { ReactElement } from "react";

export namespace TSelectAutocomplete {
  export interface Item {
    id: number | string;
    label?: string | JSX.Element;
    value?: string;
    image?: string | null;
  }

  export type avatarType = "circle" | "square";

  export type icon<T> = ({ selected, className }: { selected: T | T[]; className: string }) => ReactElement;

  export interface BaseProps<T> {
    disabled?: boolean;
    icon?: icon<T>;
    items: T[];
    tokens: Record<"zero" | "other", string>;
    type: avatarType;
  }

  export interface SingleProps<T> extends BaseProps<T> {
    multiple?: never;
    onChange?: (value: T) => void;
    selected: T;
  }

  export interface MultipleProps<T> extends BaseProps<T> {
    multiple?: true;
    onChange?: (value: T[]) => void;
    selected: T[];
  }

  export type Props<T> = SingleProps<T> | MultipleProps<T>;
}
