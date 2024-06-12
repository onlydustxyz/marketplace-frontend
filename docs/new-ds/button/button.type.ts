import { ButtonCoreVariants } from "docs/new-ds/button/button.variant";
import { VariantProps } from "tailwind-variants";

export type ButtonCoreVariants = VariantProps<typeof ButtonCoreVariants>;

export namespace TButtonCore {
  export type Variants = VariantProps<typeof ButtonCoreVariants>;

  export interface Props extends ButtonCoreVariants {
    classNames?: Partial<typeof ButtonCoreVariants["slots"]>;
    text: string;
    onClick: () => void;
  }
}
