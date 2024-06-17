import { ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TextareaCoreVariants } from "./textarea.variants";

type Variants = VariantProps<typeof TextareaCoreVariants>;
type classNames = Partial<typeof TextareaCoreVariants["slots"]>;
export interface TTextareaProps extends Variants {
  classNames?: classNames;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  isError?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
