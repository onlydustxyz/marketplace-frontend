import { Switch as NextUiSwitch } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { SwitchNextUiVariants } from "components/atoms/switch/adapters/next-ui/next-ui.variants";

import { SwitchPort } from "../../switch.types";

export function SwitchNextUiAdapter({ classNames, children, onChange, value, ...props }: SwitchPort) {
  const { isDisabled, mixed } = props;
  const slots = SwitchNextUiVariants({
    isDisabled,
    mixed,
  });

  function handleChange(value: boolean) {
    onChange?.(value);
  }

  return (
    <NextUiSwitch
      classNames={{
        base: cn(slots.base(), classNames?.base),
        label: cn(slots.label(), classNames?.label),
        wrapper: cn(slots.wrapper(), classNames?.wrapper),
        thumb: cn(slots.thumb(), classNames?.thumb),
        startContent: cn(slots.startContent(), classNames?.startContent),
        endContent: cn(slots.endContent(), classNames?.endContent),
        thumbIcon: cn(slots.thumbIcon(), classNames?.thumbIcon),
      }}
      isDisabled={isDisabled}
      isSelected={value}
      onValueChange={handleChange}
    >
      {children}
    </NextUiSwitch>
  );
}
