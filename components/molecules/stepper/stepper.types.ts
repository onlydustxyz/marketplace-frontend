import { ComponentPropsWithoutRef } from "react";

import { ProgressBarPort } from "components/atoms/progress-bar";

interface Variants extends Pick<ProgressBarPort, "color"> {}

interface ClassNames {
  base: string;
}

interface StepItem extends Pick<ProgressBarPort, "max" | "min" | "value"> {}

export interface StepperPort extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<"div">;
  classNames?: Partial<ClassNames>;
  steps: StepItem[];
}
