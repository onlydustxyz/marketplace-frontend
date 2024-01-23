import { ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";
import { TTranslate } from "components/layout/translate/translate.types";
import { typographyVariants } from "./typography.variants";

export namespace TTypography {
  export type Variants = VariantProps<typeof typographyVariants>;

  export interface Props extends PropsWithChildren, Variants {
    className?: string;
    as?: ElementType;
    translate?: TTranslate.Props;
  }
}
