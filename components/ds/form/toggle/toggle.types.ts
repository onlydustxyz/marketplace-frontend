import { VariantProps } from "tailwind-variants";

import { toggleVariants } from "./toggle.variants";

export namespace TToggle {
  export type Variants = VariantProps<typeof toggleVariants>;

  export interface Props extends Variants {
    ariaLabel: string;
    onChange: (value: boolean) => void;
    name?: string;
    value: boolean;
  }
}
