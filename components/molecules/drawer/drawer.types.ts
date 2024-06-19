import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { DrawerCoreVariants } from "./drawer.variants";

type Variants = VariantProps<typeof DrawerCoreVariants>;
type classNames = Partial<typeof DrawerCoreVariants["slots"]>;

interface HeaderProps {
  startContent?: ReactNode;
  endContent?: ReactNode;
}

interface FooterProps {
  startContent?: ReactNode;
  endContent?: ReactNode;
}
export interface DrawerPort<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  classNames?: classNames;
  header?: HeaderProps;
  footer?: FooterProps;
  onOpenChange?: (value: boolean) => void;
  isOpen?: boolean;
}
