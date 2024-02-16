import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "tailwind-variants";

import { TLink as TInternalLink } from "components/layout/link/link.types";

import { linkVariants } from "./link.variants";

export namespace TLink {
  export type Variants = VariantProps<typeof linkVariants>;

  export interface InternalProps extends Variants, TInternalLink.Props {}

  export interface ButtonProps extends Variants, ButtonHTMLAttributes<HTMLButtonElement> {}
}
