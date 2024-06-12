import { VariantProps } from "tailwind-variants";

import { ButtonCoreVariants } from "./button.variant";

export type ButtonCoreVariants = VariantProps<typeof ButtonCoreVariants>;

export interface ButtonCoreInterface extends ButtonCoreVariants {
  classNames: Partial<typeof ButtonCoreVariants["slots"]>;
  text: string;
  onClick: () => void;
}
