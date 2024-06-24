import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { BadgeCoreVariants } from "./badge.variants";

type Variants = VariantProps<typeof BadgeCoreVariants>;
type classNames = Partial<typeof BadgeCoreVariants["slots"]>;

export interface TBadgeProps<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  as?: C;
  hideContent?: boolean;
}

export interface TBadgeDotProps<C extends ElementType> extends Omit<TBadgeProps<C>, "children"> {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  as?: C;
}
