import { StepperPort } from "../../stepper.types";
import { StepperDefaultVariants } from "./default.variants";
import { ElementType } from "react";
import { cn } from "src/utils/cn";

export function StepperDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  ...props
}: StepperPort<C>) {
  const Component = as || "div";
  const slots = StepperDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />
  );
}
