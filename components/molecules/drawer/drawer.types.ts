import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";
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
export interface DrawerPort<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  classNames?: classNames;
  header?: HeaderProps;
  footer?: FooterProps;
  hasCloseButton?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  isOpen?: boolean;
  trigger?: ReactNode;
}
