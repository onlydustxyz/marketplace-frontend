import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { NavLinkProps as OriginalNavLinkProps } from "react-router-dom";
import { VariantProps } from "tailwind-variants";
import { linkVariants } from "./link.variants";

// TODO: Change to next/link after the migration
export namespace TLink {
  type HtmlLink = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "style" | "children">;
  type NavLinkProps = Omit<OriginalNavLinkProps, "to" | "children" | "className">;

  export type Variants = VariantProps<typeof linkVariants>;

  export interface LinkContentProps extends PropsWithChildren {
    isExternal: boolean;
  }

  interface BaseProps extends PropsWithChildren, Variants, NavLinkProps, HtmlLink {}

  interface AnchorProps extends BaseProps {
    href: OriginalNavLinkProps["to"];
    onClick?: never;
  }

  interface OnClickProps extends BaseProps {
    onClick: OriginalNavLinkProps["onClick"];
    href?: never;
  }

  export type Props = AnchorProps | OnClickProps;
}
