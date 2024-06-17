import { Input as NextInput } from "@nextui-org/input";

import { cn } from "src/utils/cn";

import { TInputProps } from "./input.types";
import { InputCoreVariants } from "./input.variants";

export function InputCore({
  classNames,
  isError,
  disabled,
  value,
  onChange,
  onValueChange,
  startContent,
  endContent,
  label,
}: TInputProps) {
  const slots = InputCoreVariants({ disabled, isError });

  function handleChange(value: string) {
    onValueChange?.(value);
  }

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
      isDisabled={disabled}
      disabled={disabled}
      onValueChange={handleChange}
      onChange={onChange}
      value={value}
    />
  );
}
