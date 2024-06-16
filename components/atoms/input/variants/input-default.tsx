import { InputCore } from "../input.core";
import { TInputProps } from "../input.types";

export function Input({ ...props }: TInputProps) {
  return <InputCore {...props} classNames={{}} />;
}
