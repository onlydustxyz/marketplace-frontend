import { CheckboxCore } from "../checkbox.core";
import { TCheckboxProps } from "../checkbox.types";
import { ElementType } from "react";

export function Checkbox<C extends ElementType = "div">({
  ...props
}: TCheckboxProps<C>) {
  return <CheckboxCore {...props} classNames={{}} />;
}
