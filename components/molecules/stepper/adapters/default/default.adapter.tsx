import { cn } from "src/utils/cn";

import { ProgressBar } from "components/atoms/progress-bar";

import { StepperPort } from "../../stepper.types";
import { StepperDefaultVariants } from "./default.variants";

export function StepperDefaultAdapter({ classNames, htmlProps, steps, color }: StepperPort) {
  const slots = StepperDefaultVariants();

  return (
    <div {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {steps.map((step, index) => (
        <ProgressBar key={`step-${index}`} min={step.min} max={step.max} value={step.value} color={color} />
      ))}
    </div>
  );
}
