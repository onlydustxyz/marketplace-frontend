import { LinkCore } from "../link.core";
import { TLinkProps } from "../link.types";

export function Link({ ...props }: TLinkProps) {
  return <LinkCore {...props} />;
}
