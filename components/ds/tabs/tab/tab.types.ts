import { PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { tabVariants } from "./tab.variants";

export namespace TTab {
  export type Variants = VariantProps<typeof tabVariants>;

  export interface Props extends PropsWithChildren, Variants {
    onClick: () => void;
  }
}
