import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";
import { buttonVariants } from "./variants/button.variants";

export namespace TButton {
  type HtmlButton = ButtonHTMLAttributes<HTMLButtonElement>;

  export type Variants = VariantProps<typeof buttonVariants>;
  export type PrimaryVariants = VariantProps<typeof buttonPrimaryVariants>;
  export type SecondaryVariants = VariantProps<typeof buttonSecondaryVariants>;
  export type TertiaryVariants = VariantProps<typeof buttonTertiaryVariants>;

  export interface Props extends PropsWithChildren, Variants, HtmlButton {
    className?: string;
  }
}
