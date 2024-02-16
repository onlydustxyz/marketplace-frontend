import { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

export namespace TLink {
  export interface Props extends LinkProps, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
    children?: ({ isExternal }: { isExternal: boolean }) => JSX.Element;
    className?: string;
  }
}
