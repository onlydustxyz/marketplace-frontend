import { VisuallyHidden, useRadio } from "@nextui-org/react";
import { useMemo } from "react";

import { cn } from "src/utils/cn";

import { TRadioGroupItem } from "./radio-group-item.types";

export function RadioGroupItem({ value, children, disabled, containerClassName }: TRadioGroupItem.Props) {
  const { Component, isSelected, getBaseProps, getInputProps } = useRadio({ value });

  const isActive = isSelected && !disabled;

  const memoChildren = useMemo(
    () => children({ isSelected, isActive, isDisabled: disabled || false, value }),
    [children, isActive, disabled, isSelected]
  );
  return (
    <Component {...getBaseProps()} className={cn("cursor-pointer", containerClassName)}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {memoChildren}
    </Component>
  );
}
