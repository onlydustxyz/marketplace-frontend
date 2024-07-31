import { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

import { useMatchPath } from "hooks/router/useMatchPath";

export namespace TBaseLink {
  export interface Props extends LinkProps, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "title"> {
    children?: (({ isExternal, isActive }: { isExternal: boolean; isActive: boolean }) => JSX.Element) | ReactNode;
    className?: string;
    matchPathOptions?: Parameters<typeof useMatchPath>[1] & { pattern?: string };
  }
}
