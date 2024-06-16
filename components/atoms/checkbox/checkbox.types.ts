import { CheckboxProps } from "@nextui-org/react";
import { VariantProps } from "tailwind-variants";

import { CheckboxCoreVariants } from "./checkbox.variants";

type Variants = VariantProps<typeof CheckboxCoreVariants>;
type classNames = Partial<typeof CheckboxCoreVariants["slots"]>;
interface NextUiProps extends Omit<CheckboxProps, "radius" | "classNames" | "color" | "size"> {}
export interface TCheckboxProps extends NextUiProps, Variants {
  classNames?: classNames;
}
