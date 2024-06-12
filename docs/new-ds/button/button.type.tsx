import { ButtonCoreVariants } from "docs/new-ds/button/button.variant";
import { VariantProps } from "tailwind-variants";

export type ButtonCoreVariants = VariantProps<typeof ButtonCoreVariants>;

export interface ButtonCoreInterface extends ButtonCoreVariants {
  classNames: Partial<typeof ButtonCoreVariants["slots"]>;
  text: string;
  onClick: () => void;
}
