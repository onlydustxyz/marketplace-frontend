import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { TBaseLink } from "components/layout/base-link/base-link.types";

import { LinkCoreVariants } from "./link.variants";

type Variants = VariantProps<typeof LinkCoreVariants>;
type classNames = Partial<typeof LinkCoreVariants["slots"]>;
type BaseLinkProps = Omit<TBaseLink.Props, "children" | "style">;
export interface TLinkProps extends BaseLinkProps, Variants, PropsWithChildren {
  classNames?: classNames;
}

export interface TLinkButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    Variants,
    PropsWithChildren {
  classNames?: classNames;
}
