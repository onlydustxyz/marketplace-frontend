import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

interface Variants {
  size: "m";
}

interface ClassNames {
  base: string;
  wrapper: string;
  body: string;
  backdrop: string;
  footer: string;
  header: string;
}

interface BlockProps {
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export interface DrawerPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  classNames?: Partial<ClassNames>;
  header?: BlockProps;
  footer?: BlockProps;
  onOpenChange?: (value: boolean) => void;
  isOpen?: boolean;
  hideHeader?: boolean;
}
