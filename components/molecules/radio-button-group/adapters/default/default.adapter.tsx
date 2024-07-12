import { ReactNode } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { RadioGroup } from "components/atoms/radio-group";

import { CustomButtonProps, RadioGroupButtonPort } from "../../radio-button-group.types";

export function CustomButton({ label, children, variant = "secondary-light", ...props }: CustomButtonProps): ReactNode {
  return (
    <Button as={"div"} variant={variant} {...props} startContent={children}>
      {label}
    </Button>
  );
}
export function RadioButtonGroupDefaultAdapter<V extends string>({
  items,
  variant,
  size,
  isDisabled,
  ...props
}: RadioGroupButtonPort<V>) {
  return (
    <RadioGroup
      {...props}
      isDisabled={isDisabled}
      as={CustomButton}
      items={items.map(({ label, ...item }) => ({
        ...item,
        componentProps: { label, variant, size, isDisabled },
      }))}
    />
  );
}
