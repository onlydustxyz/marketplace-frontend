import { Input as NextInput } from "@nextui-org/input";

import { cn } from "src/utils/cn";

import { TInputProps } from "./input.types";
import { InputCoreVariants } from "./input.variants";

export function InputCore({
  classNames,
  isError,
  isDisabled,
  value,
  onChange,
  startContent,
  endContent,
  label,
}: TInputProps) {
  const slots = InputCoreVariants({ isDisabled, isError });

  return (
    <NextInput
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
      variant="bordered"
      labelPlacement="outside-left"
      startContent={startContent}
      endContent={endContent}
      isDisabled={isDisabled}
      disabled={isDisabled}
      onChange={onChange}
      value={value}
    />
  );
}
