import { cn } from "src/utils/cn";

import { LinkCoreVariants } from "components/atoms/link/link.variants";

import { TLinkButtonProps } from "../link.types";

export function LinkButton({ classNames, ...props }: TLinkButtonProps) {
  const { color, ...htmlProps } = props;
  const slots = LinkCoreVariants({ color });
  return <button className={cn(slots.base(), classNames?.base)} {...htmlProps} />;
}
