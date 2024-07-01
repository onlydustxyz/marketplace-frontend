import { ElementType } from "react";

import { ButtonDanger } from "components/atoms/button/variants/button-danger";

import { ButtonPort } from "../button.types";
import { ButtonPrimary } from "./button-primary";
import { ButtonSecondaryDark } from "./button-secondary-dark";
import { ButtonSecondaryLight } from "./button-secondary-light";

type Port<C extends ElementType> = ButtonPort<C> & {
  variant?: "primary" | "danger" | "secondary-light" | "secondary-dark";
};

export function Button<C extends ElementType = "button">({ ...props }: Port<C>) {
  switch (props.variant) {
    case "secondary-light":
      return <ButtonSecondaryLight {...props} />;
    case "secondary-dark":
      return <ButtonSecondaryDark {...props} />;
    case "danger":
      return <ButtonDanger {...props} />;
    case "primary":
    default:
      return <ButtonPrimary {...props} />;
  }
}
