import { InputProps } from "@nextui-org/react";
import { VariantProps } from "tailwind-variants";

import { InputCoreVariants } from "./input.variants";

type Variants = VariantProps<typeof InputCoreVariants>;
type classNames = Partial<typeof InputCoreVariants["slots"]>;
interface NextUiProps extends Omit<InputProps, "color" | "radius" | "variant"> {}
export interface TInputProps extends NextUiProps, Variants {
  classNames?: classNames;
}
