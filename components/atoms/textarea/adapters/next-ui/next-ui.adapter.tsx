import { Textarea as NextTextarea } from "@nextui-org/react";
import { ForwardedRef, forwardRef } from "react";

import { cn } from "src/utils/cn";

import { TextareaPort } from "../../textarea.types";
import { TextareaNextUiVariants } from "./next-ui.variants";

export const TextareaNextUiAdapter = forwardRef(function TextareaNextUiAdapter(
  {
    id,
    name,
    classNames,
    onChange,
    value,
    minRows,
    maxRows,
    disableAutosize,
    isDisabled,
    isError,
    startContent,
    endContent,
  }: TextareaPort,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const slots = TextareaNextUiVariants({ isDisabled, isError });

  function handleChange(value: string) {
    onChange?.(value);
  }

  return (
    <NextTextarea
      ref={ref}
      id={id}
      name={name}
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
      isDisabled={isDisabled}
      disabled={isDisabled}
      onValueChange={handleChange}
      value={value}
      minRows={minRows}
      maxRows={maxRows}
      disableAutosize={disableAutosize}
      startContent={startContent}
      endContent={endContent}
    />
  );
});
