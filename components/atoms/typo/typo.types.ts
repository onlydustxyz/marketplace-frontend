import { ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { TTranslate } from "components/layout/translate/translate.types";

import { TypoCoreVariants } from "./typo.variants";

type Variants = VariantProps<typeof TypoCoreVariants>;
type classNames = Partial<typeof TypoCoreVariants["slots"]>;

export type TTypoProps<T extends ElementType = "p"> = AsProps<T> &
  Variants &
  PropsWithChildren & {
    classNames?: classNames;
    as?: T;
    translate?: TTranslate.Props;
  };
