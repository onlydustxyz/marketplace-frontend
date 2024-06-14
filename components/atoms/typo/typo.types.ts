import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TTranslate } from "components/layout/translate/translate.types";

import { TypoCoreVariants } from "./typo.variants";

type Variants = VariantProps<typeof TypoCoreVariants>;
type classNames = Partial<typeof TypoCoreVariants["slots"]>;

interface BaseProps<C extends ElementType> extends Variants {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  as?: C;
}

interface WithChildren<C extends ElementType> extends BaseProps<C> {
  translate?: never;
  children: ReactNode;
}

interface WithTranslate<C extends ElementType> extends BaseProps<C> {
  translate: TTranslate.Props;
  children?: never;
}

export type TTypoProps<C extends ElementType> = WithChildren<C> | WithTranslate<C>;
