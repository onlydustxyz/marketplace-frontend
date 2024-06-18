import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { TTranslate } from "components/layout/translate/translate.types";

import { TypoCoreVariants } from "./typo.variants";

type Variants = VariantProps<typeof TypoCoreVariants>;
type classNames = Partial<typeof TypoCoreVariants["slots"]>;

export interface TTypoProps<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  as?: C;
  translate?: TTranslate.Props;
}
