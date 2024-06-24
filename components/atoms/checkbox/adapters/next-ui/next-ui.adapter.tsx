import { Checkbox as NextUiCheckbox } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { CheckboxPort } from "../../checkbox.types";
import { CheckboxNextUiVariants } from "./next-ui.variants";

export function CheckboxNextUiAdapter({ classNames, onChange, value, ...props }: CheckboxPort) {
  const { color, isDisabled, mixed } = props;
  const slots = CheckboxNextUiVariants({
    color,
    isDisabled,
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
      isDisabled={isDisabled}
      disabled={isDisabled}
      isIndeterminate={mixed}
      isSelected={value}
      onValueChange={handleChange}
    />
  );
}
