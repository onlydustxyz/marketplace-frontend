import { Textarea as NextTextarea } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TTextareaProps } from "./textarea.types";
import { TextareaCoreVariants } from "./textarea.variants";

export function TextareaCore({
  classNames,
  onChange,
  value,
  multiple,
  disabled,
  isError,
  startContent,
  endContent,
}: TTextareaProps) {
  const slots = TextareaCoreVariants({ isDisabled: disabled, isInvalid: isError });

  function handleChange(value: string) {
    onChange?.(value);
  }

  return (
    <NextTextarea
      className="h-fit flex-col items-start gap-2"
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
      variant="bordered"
      labelPlacement="outside-left"
      isDisabled={disabled}
      disabled={disabled}
      onValueChange={handleChange}
      value={value}
      multiple={multiple}
      startContent={startContent}
      endContent={endContent}
    />
  );
}
