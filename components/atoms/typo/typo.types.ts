import { ElementType, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { TTranslate } from "components/layout/translate/translate.types";

import { TypoCoreVariants } from "./typo.variants";

type Variants = VariantProps<typeof TypoCoreVariants>;
type classNames = Partial<typeof TypoCoreVariants["slots"]>;

type BaseProps<C extends ElementType> = AsProps<C> &
  Variants & {
    classNames?: classNames;
    as?: C;
  };

type WithChildren<C extends ElementType> = BaseProps<C> & {
  translate?: never;
  children: ReactNode;
};
type WithTranslate<C extends ElementType> = BaseProps<C> & {
  translate: TTranslate.Props;
  children?: never;
};

export type TTypoProps<C extends ElementType> = WithChildren<C> | WithTranslate<C>;
