import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { TTagCoreProps } from "./tag.types";
import { TagCoreVariants } from "./tag.variants";

export function TagCore<C extends ElementType = "div">({ classNames, startContent, as, ...props }: TTagCoreProps<C>) {
  const Component = as || "div";
  const { deletable, hideText, display, size, ...htmlProps } = props;
  const slots = TagCoreVariants({ deletable, hideText, display, size });

  return <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />;
}
