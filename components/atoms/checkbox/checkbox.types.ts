import { VariantProps } from "tailwind-variants";

import { CheckboxCoreVariants } from "./checkbox.variants";

type Variants = VariantProps<typeof CheckboxCoreVariants>;
type classNames = Partial<typeof CheckboxCoreVariants["slots"]>;
export interface TCheckboxProps extends Variants {
  classNames?: classNames;
  onChange?: (checked: boolean) => void;
  value?: boolean;
  disabled?: boolean;
  mixed?: boolean;
}
