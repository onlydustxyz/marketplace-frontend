import { StepperDefaultAdapter } from "../adapters/default/default.adapter";
import { StepperPort } from "../stepper.types";
import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { ElementType } from "react";

export function Stepper<C extends ElementType = "div">(props: StepperPort<C>) {
  return withComponentAdapter<StepperPort<C>>(StepperDefaultAdapter)(props);
}
