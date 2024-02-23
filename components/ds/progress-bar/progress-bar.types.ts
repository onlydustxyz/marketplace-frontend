import { PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { progressbarVariants } from "./progress-bar.variants";

export namespace TProgressBar {
  export type Variants = VariantProps<typeof progressbarVariants>;

  export interface classNames {
    base: string;
    track: string;
    indicator: string;
    label: string;
    value: string;
  }

  export interface Props extends PropsWithChildren, Variants {
    classNames?: Partial<classNames>;
    value: number;
    maxValue: number;
  }
}
