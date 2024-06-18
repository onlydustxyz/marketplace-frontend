import { CheckboxCore } from "../checkbox.core";
import { TCheckboxProps } from "../checkbox.types";

export function Checkbox({ ...props }: TCheckboxProps) {
  return <CheckboxCore {...props} />;
}
