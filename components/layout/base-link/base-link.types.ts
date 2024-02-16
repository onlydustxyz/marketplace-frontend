import { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

export namespace TBaseLink {
  export interface Props extends LinkProps, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
    children?: (({ isExternal, isActive }: { isExternal: boolean; isActive: boolean }) => JSX.Element) | ReactNode;
    className?: string;
  }
}
