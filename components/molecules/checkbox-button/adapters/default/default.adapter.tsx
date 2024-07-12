import { Button } from "components/atoms/button/variants/button-default";
import { Checkbox } from "components/atoms/checkbox";
import { getComponentsVariants } from "components/molecules/checkbox-button/checkbox-button.utils";

import { CheckboxButtonPort } from "../../checkbox-button.types";

export function CheckboxButtonDefaultAdapter({
  variant = "secondary-light",
  size,
  isDisabled,
  children,
  ...props
}: CheckboxButtonPort) {
  const { checkboxColor } = getComponentsVariants(variant);
  return (
    <>
      <Button
        as={"label"}
        variant={variant}
        size={size}
        startContent={<Checkbox isDisabled={isDisabled} color={checkboxColor} {...props} />}
      >
        {children}
      </Button>
    </>
  );
}
