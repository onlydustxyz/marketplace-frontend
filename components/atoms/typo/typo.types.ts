import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { TTranslate } from "components/layout/translate/translate.types";

import { TypoCoreVariants } from "./typo.variants";

type Variants = VariantProps<typeof TypoCoreVariants>;
type classNames = Partial<typeof TypoCoreVariants["slots"]>;

export interface TypoPort<C extends ElementType> extends Variants, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  translate?: TTranslate.Props;
}
