import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

interface Variants {
  size: "s" | "m" | "l";
  container: "1" | "2" | "3" | "4" | "action" | "inverse" | "transparent";
  border: "none" | "container-stroke-separator";
}

interface ClassNames {
  base: string;
}

export interface PaperPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
}
