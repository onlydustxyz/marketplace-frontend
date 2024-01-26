import { InputHTMLAttributes, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";
import { selectableTagItemVariants } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item.variants";

export namespace TSelectableTagItem {
  export type Variants = VariantProps<typeof selectableTagItemVariants>;
  export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>;

  export interface Props<V extends string> extends PropsWithChildren, Variants {
    value: V;
    className?: string;
    checkboxProps?: CheckBoxProps;
  }
}
