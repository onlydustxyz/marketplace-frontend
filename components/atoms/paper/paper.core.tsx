import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { TPaperProps } from "./paper.types";
import { PaperCoreVariants } from "./paper.variants";

export function PaperCore<C extends ElementType = "article">({
  classNames,
  children,
  as,
  htmlProps,
  ...props
}: TPaperProps<C>) {
  const Component = as || "article";
  const { size, container } = props;
  const slots = PaperCoreVariants({ size, container });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {children}
    </Component>
  );
}
