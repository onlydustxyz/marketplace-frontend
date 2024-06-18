import { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { InputCoreVariants } from "./input.variants";

type Variants = VariantProps<typeof InputCoreVariants>;
type classNames = Partial<typeof InputCoreVariants["slots"]>;
type htmlInputProps = ComponentPropsWithoutRef<"input">;
export interface TInputProps extends htmlInputProps, Variants {
  classNames?: classNames;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isDisabled?: boolean;
  label?: ReactNode;
}
