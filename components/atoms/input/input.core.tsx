import { cn } from "src/utils/cn";

import { PropsWithAdapter } from "components/types/props-with-adapter";

import { InputPort } from "./input.types";
import { InputCoreVariants } from "./input.variants";

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
  const slots = InputCoreVariants({ isDisabled, isError });

  return (
    <Adapter
      classNames={{
        base: cn(slots.base(), classNames?.base),
        mainWrapper: cn(slots.mainWrapper(), classNames?.mainWrapper),
        inputWrapper: cn(slots.inputWrapper(), classNames?.inputWrapper),
        innerWrapper: cn(slots.innerWrapper(), classNames?.innerWrapper),
        input: cn(slots.input(), classNames?.input),
        errorMessage: cn(slots.errorMessage(), classNames?.errorMessage),
        label: cn(slots.label(), classNames?.label),
        helperWrapper: cn(slots.helperWrapper(), classNames?.helperWrapper),
        description: cn(slots.description(), classNames?.description),
      }}
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
