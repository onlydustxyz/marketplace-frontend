import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { useIcon } from "components/layout/icon/icon.hooks";

import { TTagProps } from "./tag.types";
import { TagCoreVariants } from "./tag.variants";

export function TagCore<C extends ElementType = "div">({ classNames, startIcon, as, ...props }: TTagProps<C>) {
  const Component = as || "div";
  const { deletable, iconOnly, display, size, ...htmlProps } = props;
  const slots = TagCoreVariants({ deletable, iconOnly, display, size });

  const StartIcon = useIcon(startIcon, {
    className: cn(slots.startIcon(), classNames?.startIcon, startIcon?.className),
  });

  return <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />;
}
