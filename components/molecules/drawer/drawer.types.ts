import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { DrawerCoreVariants } from "./drawer.variants";

type Variants = VariantProps<typeof DrawerCoreVariants>;
type classNames = Partial<typeof DrawerCoreVariants["slots"]>;

interface BlockProps {
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export interface DrawerPort<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  classNames?: classNames;
  header?: BlockProps;
  footer?: BlockProps;
  onOpenChange?: (value: boolean) => void;
  isOpen?: boolean;
}
