import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { TPaperProps } from "./paper.types";
import { PaperCoreVariants } from "./paper.variants";

export function PaperCore<C extends ElementType = "article">({ classNames, as, htmlProps, ...props }: TPaperProps<C>) {
  const Component = as || "article";
  const { size, container, border, ...rest } = props;
  const slots = PaperCoreVariants({ size, container, border });

  return <Component {...htmlProps} {...rest} className={cn(slots.base(), classNames?.base)} />;
}
