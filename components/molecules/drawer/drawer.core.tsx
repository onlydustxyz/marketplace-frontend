import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { TDrawerProps } from "./drawer.types";
import { DrawerCoreVariants } from "./drawer.variants";

export function DrawerCore<C extends ElementType = "div">({
  classNames,
  as,
  hasCloseButton,
  header,
  footer,
  ...props
}: TDrawerProps<C>) {
  const Component = as || "div";
  const { ...htmlProps } = props;
  const slots = DrawerCoreVariants();

  return <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />;
}
