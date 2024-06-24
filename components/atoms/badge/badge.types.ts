import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

interface Variants {
  size: "s" | "m";
  colors: "default" | "brand-1" | "brand-2" | "brand-3" | "brand-4";
  style: "fill" | "outline";
  fitContent: boolean;
}

interface ClassNames {
  base: string;
  contentWrapper: string;
  content: string;
}

export interface BadgePort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  hideContent?: boolean;
}

export interface BadgeDotPortDot<C extends ElementType> extends Omit<BadgePort<C>, "children"> {}
