import { ReactNode } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Radio } from "components/atoms/radio";

import { CustomButtonProps, RadioButtonPort } from "../../radio-button.types";

export function CustomButton({ label, children, ...props }: CustomButtonProps): ReactNode {
  return (
    <Button as={"div"} variant={"secondary-light"} {...props} startContent={children}>
      {label}
    </Button>
  );
}
export function RadioButtonDefaultAdapter<V extends string>({ items, ...props }: RadioButtonPort<V>) {
  return (
    <Radio
      {...props}
      as={CustomButton}
      items={items.map(({ label, ...item }) => ({ ...item, componentProps: { label } }))}
    />
  );
}
