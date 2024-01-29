import { PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { selectableTagVariants } from "./selectable-tag.variants";

export namespace TSelectableTag {
  export type Variants = VariantProps<typeof selectableTagVariants>;

  export interface Props extends PropsWithChildren, Variants {
    onClick: () => void;
    className?: string;
  }
}
