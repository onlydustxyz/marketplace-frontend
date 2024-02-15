import { InputHTMLAttributes, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { selectableTagItemVariants } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item.variants";
import { TTooltip } from "components/ds/tooltip/tooltip.types";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TSelectableTagItem {
  export type Variants = VariantProps<typeof selectableTagItemVariants>;
  export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>;

  export interface Props<V extends string> extends PropsWithChildren, Variants {
    value: V;
    className?: string;
    checkboxProps?: CheckBoxProps;
    icon?: TIcon.renderIcon;
    activeIcon?: TIcon.renderIcon;
    disabled?: boolean;
    active?: boolean;
    tooltipProps?: TTooltip.Props;
  }
}
