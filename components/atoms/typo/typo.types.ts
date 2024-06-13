import { ElementType, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { TTranslate } from "components/layout/translate/translate.types";

import { TypoCoreVariants } from "./typo.variants";

type Variants = VariantProps<typeof TypoCoreVariants>;
type classNames = Partial<typeof TypoCoreVariants["slots"]>;

type BaseProps<T extends ElementType> = AsProps<T> &
  Variants & {
    classNames?: classNames;
    as?: T;
  };

type WithChildren<T extends ElementType> = BaseProps<T> & {
  translate?: never;
  children: ReactNode;
};
type WithTranslate<T extends ElementType> = BaseProps<T> & {
  translate: TTranslate.Props;
  children?: never;
};

export type TTypoProps<T extends ElementType> = WithChildren<T> | WithTranslate<T>;
