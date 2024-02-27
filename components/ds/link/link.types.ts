import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "tailwind-variants";

import { TBaseLink } from "components/layout/base-link/base-link.types";

import { linkVariants } from "./link.variants";

export namespace TLink {
  export type Variants = VariantProps<typeof linkVariants>;

  export interface LinkProps extends Variants, TBaseLink.Props {}

  export interface ButtonProps extends Variants, ButtonHTMLAttributes<HTMLButtonElement> {}
}
