import { Textarea as NextTextarea } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TTextareaProps } from "./textarea.types";
import { TextareaCoreVariants } from "./textarea.variants";

export function TextareaCore({ classNames, ...props }: TTextareaProps) {
  const slots = TextareaCoreVariants({ isDisabled: props.isDisabled || props.disabled, isInvalid: props.isInvalid });

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
      {...props}
      isDisabled={props.isDisabled || props.disabled}
    />
  );
}
