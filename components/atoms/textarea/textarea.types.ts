import { ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TextareaCoreVariants } from "./textarea.variants";

type Variants = VariantProps<typeof TextareaCoreVariants>;
type classNames = Partial<typeof TextareaCoreVariants["slots"]>;
export interface TTextareaProps extends Variants {
  id?: string;
  name: string;
  classNames?: classNames;
  isDisabled?: boolean;
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  isError?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
