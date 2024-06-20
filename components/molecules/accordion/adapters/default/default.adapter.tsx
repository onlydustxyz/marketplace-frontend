import { AccordionPort } from "../../accordion.types";
import { AccordionDefaultVariants } from "./default.variants";
import { ElementType } from "react";
import { cn } from "src/utils/cn";

export function AccordionDefaultAdapter<C extends ElementType = "div">({
  classNames,
  as,
  ...props
}: AccordionPort<C>) {
  const Component = as || "div";
  const { ...htmlPort } = props;
  const slots = AccordionDefaultVariants();

  return (
    <Component {...htmlPort} className={cn(slots.base(), classNames?.base)} />
  );
}
