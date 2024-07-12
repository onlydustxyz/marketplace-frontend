import { RadioGroup as NextRadioGroup } from "@nextui-org/radio";
import { VisuallyHidden, useRadio } from "@nextui-org/react";
import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";

import { RadioGroupPort, RadioPort } from "../../radio-group.types";
import { RadioDefaultVariants } from "./next-ui.variants";

function Radio<V extends string, C extends ElementType = "div">({
  as,
  value,
  mixed,
  color = "white",
  classNames,
  componentProps,
}: RadioPort<V, C>) {
  const InnerComponent = as || "div";
  const { Component, isSelected, getBaseProps, getInputProps, isDisabled } = useRadio({ value });
  const slots = RadioDefaultVariants({ isDisabled, isActive: isSelected, mixed, color });

  return (
    <Component {...getBaseProps()} className={cn(slots.item(), { "pointer-events-none": isDisabled })}>
      <InnerComponent {...componentProps}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div className={cn(slots.indicator(), classNames?.indicator)}>
          <Icon
            remixName={"ri-check-fill"}
            size={16}
            className={cn(
              slots.indicatorIcon(),
              {
                "opacity-100": isSelected && !mixed,
              },
              classNames?.indicatorIcon
            )}
          />
        </div>
      </InnerComponent>
    </Component>
  );
}

export function RadioGroupNextUiAdapter<V extends string, C extends ElementType = "div">({
  as,
  classNames,
  onChange,
  items,
  value,
  ...props
}: RadioGroupPort<V, C>) {
  const Component = as || "div";
  const slots = RadioDefaultVariants();

  const handleChange = (value: string) => {
    onChange?.(value as V);
  };

  return (
    <NextRadioGroup
      isDisabled={props.isDisabled}
      classNames={{ wrapper: cn(slots.base(), classNames?.base) }}
      onValueChange={handleChange}
      value={value}
    >
      {items.map(item => (
        <Radio key={item.value} as={Component} {...props} {...item} />
      ))}
    </NextRadioGroup>
  );
}
