import { AnchorHTMLAttributes } from "react";

export function Link({
  target = "_blank",
  rel = "noopener noreferrer",
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target={target} rel={rel} {...restProps} />;
}
