import { Input } from "@nextui-org/input";

import { InputPort } from "components/atoms/input/input.types";

export function NextUiAdapter({
  classNames,
  isError,
  isDisabled,
  value,
  onChange,
  startContent,
  endContent,
  label,
}: InputPort) {
  return (
    <Input
      classNames={classNames}
      label={label}
      variant="bordered"
      labelPlacement="outside-left"
      startContent={startContent}
      endContent={endContent}
      isDisabled={isDisabled}
      disabled={isDisabled}
      isInvalid={isError}
      onChange={onChange}
      value={value}
    />
  );
}
