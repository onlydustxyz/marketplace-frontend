import { Input } from "@nextui-org/input";
import { ForwardedRef, forwardRef } from "react";

import { cn } from "src/utils/cn";

import { InputNextUiVariants } from "components/atoms/input/adapters/next-ui/next-ui.variants";
import { InputPort } from "components/atoms/input/input.types";

export const InputNextUiAdapter = forwardRef(function InputNextUiAdapter(
  { classNames, isError, isDisabled, value, onChange, startContent, endContent, label }: InputPort,
  ref: ForwardedRef<HTMLInputElement>
) {
  const slots = InputNextUiVariants({ isDisabled, isError });
  return (
    <Input
      ref={ref}
      classNames={{
        base: cn(slots.base(), classNames?.container),
        mainWrapper: cn(slots.mainWrapper()),
        inputWrapper: cn(slots.inputWrapper(), classNames?.input),
        innerWrapper: cn(slots.innerWrapper()),
        input: cn(slots.input()),
        errorMessage: cn(slots.errorMessage()),
        label: cn(slots.label(), classNames?.label),
        helperWrapper: cn(slots.helperWrapper()),
        description: cn(slots.description()),
      }}
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
});
