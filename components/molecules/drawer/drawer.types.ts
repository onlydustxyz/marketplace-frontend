import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { DrawerCoreVariants } from "./drawer.variants";

type Variants = VariantProps<typeof DrawerCoreVariants>;
type classNames = Partial<typeof DrawerCoreVariants["slots"]>;

interface HeaderProps {
  leftContainer?: ReactNode;
  rightContainer?: ReactNode;
  title?: ReactNode;
}

interface FooterProps {
  leftContainer?: ReactNode;
  rightContainer?: ReactNode;
}
export interface TDrawerProps<C extends ElementType> extends Variants {
  classNames?: classNames;
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  hasCloseButton?: boolean;
  header?: HeaderProps;
  footer?: FooterProps;
}
