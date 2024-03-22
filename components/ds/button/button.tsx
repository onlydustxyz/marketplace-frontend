import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { buttonMultiColorVariants } from "components/ds/button/variants/button-multi-color.variants";

import { TButton } from "./button.types";
import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";

export function Button<T extends ElementType = typeof TButton.DEFAULT_ELEMENT_TYPE>({
  as,
  type = "button",
  variant = "primary",
  className,
  ...props
}: TButton.Props<T>) {
  const Component = as ?? TButton.DEFAULT_ELEMENT_TYPE;
  const buttonType = Component === TButton.DEFAULT_ELEMENT_TYPE ? type : undefined;

  return (
    <Component
      className={cn(
        variant === "primary" && buttonPrimaryVariants({ ...props }),
        variant === "secondary" && buttonSecondaryVariants({ ...props }),
        variant === "tertiary" && buttonTertiaryVariants({ ...props }),
        variant === "multi-color" && buttonMultiColorVariants({ ...props }),
        className
      )}
      type={buttonType}
      {...props}
    />
  );
}
