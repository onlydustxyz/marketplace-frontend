import { PropsWithAdapter } from "components/types/props-with-adapter";

import { InputPort } from "./input.types";

export function InputCore({
  Adapter,
  classNames,
  isError,
  isDisabled,
  value,
  onChange,
  startContent,
  endContent,
  label,
}: PropsWithAdapter<InputPort>) {
  return (
    <Adapter
      classNames={classNames}
      label={label}
      startContent={startContent}
      endContent={endContent}
      isDisabled={isDisabled}
      isError={isError}
      disabled={isDisabled}
      onChange={onChange}
      value={value}
    />
  );
}
