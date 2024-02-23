import { CheckboxProps } from "@nextui-org/react";

export namespace TCheckbox {
  export interface Props extends Omit<CheckboxProps, "radius" | "classNames"> {}
}
