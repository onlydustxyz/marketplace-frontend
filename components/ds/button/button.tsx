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
  accentColor,
  backgroundColor,
  iconOnly,
  ...props
}: TButton.Props<T>) {
  const Component = as ?? TButton.DEFAULT_ELEMENT_TYPE;
  const buttonType = Component === TButton.DEFAULT_ELEMENT_TYPE ? type : undefined;
  const variantProps = { ...props, accentColor, backgroundColor, iconOnly };
  return (
    <Component
      className={cn(
        variant === "primary" && buttonPrimaryVariants({ ...variantProps }),
        variant === "secondary" && buttonSecondaryVariants({ ...variantProps }),
        variant === "tertiary" && buttonTertiaryVariants({ ...variantProps }),
        variant === "multi-color" && buttonMultiColorVariants({ ...variantProps }),
        className
      )}
      type={buttonType}
      {...props}
    />
  );
}
