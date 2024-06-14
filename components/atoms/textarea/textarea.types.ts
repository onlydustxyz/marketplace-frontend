import { TextAreaProps } from "@nextui-org/react";
import { VariantProps } from "tailwind-variants";

import { TextareaCoreVariants } from "./textarea.variants";

type Variants = VariantProps<typeof TextareaCoreVariants>;
type classNames = Partial<typeof TextareaCoreVariants["slots"]>;
interface NextUiProps extends Omit<TextAreaProps, "color" | "radius" | "variant"> {}
export interface TTextareaProps extends NextUiProps, Variants {
  classNames?: classNames;
}
