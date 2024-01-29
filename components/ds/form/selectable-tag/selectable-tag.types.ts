import { CheckboxGroupProps } from "@nextui-org/react";

import { TSelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item.types";

export namespace TSelectableTag {
  export type Mode = "single" | "multiple";
  export type BaseCheckboxGroupProps = Omit<CheckboxGroupProps, "value" | "onChange">;
  export interface BaseProps<V extends string> extends Partial<BaseCheckboxGroupProps> {
    className?: string;
    mode: Mode;
    options: TSelectableTagItem.Props<V>[];
  }

  export interface MultipleProps<V extends string> extends BaseProps<V> {
    mode: "multiple";
    value: V[];
    onChange: (value: V[]) => void;
  }

  export interface SingleProps<V extends string> extends BaseProps<V> {
    mode: "single";
    value: V | null;
    onChange: (value: V | null) => void;
  }

  export type Props<V extends string> = MultipleProps<V> | SingleProps<V>;
}
