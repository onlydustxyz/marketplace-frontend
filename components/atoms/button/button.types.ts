import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TIcon } from "components/layout/icon/icon.types";

import { ButtonCoreVariants } from "./button.variants";

type Variants = VariantProps<typeof ButtonCoreVariants>;
type classNames = Partial<typeof ButtonCoreVariants["slots"]>;

export interface TButtonProps<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  as?: C;
  startIcon?: TIcon.Props;
  endIcon?: TIcon.Props;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
