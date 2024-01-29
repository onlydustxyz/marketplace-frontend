import { cn } from "src/utils/cn";

import { TButton } from "./button.types";
import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";

export function Button({
  as: Component = "button",
  type = "button",
  variant = "primary",
  className,
  ...props
}: TButton.Props) {
  return (
    <Component
      className={cn(
        variant === "primary" && buttonPrimaryVariants({ ...props }),
        variant === "secondary" && buttonSecondaryVariants({ ...props }),
        variant === "tertiary" && buttonTertiaryVariants({ ...props }),
        className
      )}
      {...props}
      type={type}
    />
  );
}
