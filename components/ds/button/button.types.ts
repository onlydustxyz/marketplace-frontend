import { ComponentPropsWithoutRef, ElementType } from "react";
import { VariantProps } from "tailwind-variants";

import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";
import { buttonVariants } from "./variants/button.variants";

export namespace TButton {
  export type Variants = VariantProps<typeof buttonVariants>;
  export type PrimaryVariants = VariantProps<typeof buttonPrimaryVariants>;
  export type SecondaryVariants = VariantProps<typeof buttonSecondaryVariants>;
  export type TertiaryVariants = VariantProps<typeof buttonTertiaryVariants>;

  export const DEFAULT_ELEMENT_TYPE = "button";

  export type Props<T extends ElementType = typeof DEFAULT_ELEMENT_TYPE> = Variants &
    ComponentPropsWithoutRef<T> & {
      as?: T;
    };
}
