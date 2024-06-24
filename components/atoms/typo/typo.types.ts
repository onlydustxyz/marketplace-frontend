import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import { TTranslate } from "components/layout/translate/translate.types";

interface Variants {
  weight: "regular" | "medium";
  variant: "default" | "brand";
  size: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  color: "text-1" | "text-2" | "text-3" | "text-4";
}

interface ClassNames {
  base: string;
}

export interface TypoPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  translate?: TTranslate.Props;
}
