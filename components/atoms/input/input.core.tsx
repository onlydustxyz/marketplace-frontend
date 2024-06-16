import { Input as NextInput } from "@nextui-org/input";

import { cn } from "src/utils/cn";

import { TInputProps } from "./input.types";
import { InputCoreVariants } from "./input.variants";

export function InputCore({ classNames, ...props }: TInputProps) {
  const slots = InputCoreVariants({ isDisabled: props.isDisabled || props.disabled, isInvalid: props.isInvalid });

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
      variant="bordered"
      labelPlacement="outside-left"
      {...props}
    />
  );
}
