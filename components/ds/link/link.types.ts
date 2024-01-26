import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { NavLinkProps as OriginalNavLinkProps } from "react-router-dom";

// TODO: Change to next/link after the migration
export namespace TLink {
  type HtmlLink = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "style" | "children">;
  type NavLinkProps = Omit<OriginalNavLinkProps, "to" | "children" | "className">;

  export interface LinkContentProps extends PropsWithChildren {
    isExternal: boolean;
  }

  // It'll be easier to change to next/link like that
  export interface Props extends PropsWithChildren, NavLinkProps, HtmlLink {
    href: OriginalNavLinkProps["to"];
  }
}
