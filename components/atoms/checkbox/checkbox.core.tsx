import { Checkbox as NextUiCheckbox } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TCheckboxProps } from "./checkbox.types";
import { CheckboxCoreVariants } from "./checkbox.variants";

export function CheckboxCore({ classNames, onChange, value, ...props }: TCheckboxProps) {
  const { color, disabled, mixed } = props;
  const slots = CheckboxCoreVariants({
    color,
    disabled,
    mixed,
  });

  function handleChange(value: boolean) {
    onChange?.(value);
  }

  return (
    <NextUiCheckbox
      classNames={{
        base: cn(slots.base(), classNames?.base),
        label: cn(slots.label(), classNames?.label),
        wrapper: cn(slots.wrapper(), classNames?.wrapper),
        icon: cn(slots.icon(), classNames?.icon),
      }}
      isDisabled={disabled}
      disabled={disabled}
      isIndeterminate={mixed}
      isSelected={value}
      onValueChange={handleChange}
    />
  );
}
