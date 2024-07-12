import { ReactNode } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Radio } from "components/atoms/radio";

import { CustomButtonProps, RadioButtonPort } from "../../radio-button.types";

export function CustomButton({ label, children, variant = "secondary-light", ...props }: CustomButtonProps): ReactNode {
  return (
    <Button as={"div"} variant={variant} {...props} startContent={children}>
      {label}
    </Button>
  );
}
export function RadioButtonDefaultAdapter<V extends string>({
  items,
  variant,
  size,
  isDisabled,
  ...props
}: RadioButtonPort<V>) {
  return (
    <Radio
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
