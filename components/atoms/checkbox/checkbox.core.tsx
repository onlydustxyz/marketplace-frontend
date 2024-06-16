import { Checkbox as NextUiCheckbox } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TCheckboxProps } from "./checkbox.types";
import { CheckboxCoreVariants } from "./checkbox.variants";

export function CheckboxCore({ classNames, ...props }: TCheckboxProps) {
  const { color, ...nextUiProps } = props;
  const slots = CheckboxCoreVariants({
    color,
    isDisabled: nextUiProps.isDisabled || nextUiProps.disabled,
    isIndeterminate: nextUiProps.isIndeterminate,
  });

  return (
    <NextUiCheckbox
      classNames={{
        base: cn(slots.base(), classNames?.base),
        label: cn(slots.label(), classNames?.label),
        wrapper: cn(slots.wrapper(), classNames?.wrapper),
        icon: cn(slots.icon(), classNames?.icon),
      }}
      {...nextUiProps}
    />
  );
}
