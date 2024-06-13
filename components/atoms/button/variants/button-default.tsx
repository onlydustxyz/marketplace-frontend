import { ElementType } from "react";

import { ButtonDanger } from "components/atoms/button/variants/button-danger";

import { TButtonProps } from "../button.types";
import { ButtonPrimary } from "./button-primary";
import { ButtonSecondaryDark } from "./button-secondary-dark";
import { ButtonSecondaryLight } from "./button-secondary-light";

type variant = "primary" | "danger" | "secondary-light" | "secondary-dark";
export function Button<C extends ElementType = "button">({ ...props }: TButtonProps<C> & { variant?: variant }) {
  if (!props.variant || props.variant === "primary") {
    return <ButtonPrimary {...props} />;
  }

  if (props.variant === "secondary-dark") {
    return <ButtonSecondaryDark {...props} />;
  }

  if (props.variant === "secondary-light") {
    return <ButtonSecondaryLight {...props} />;
  }

  if (props.variant === "danger") {
    return <ButtonDanger {...props} />;
  }
}
