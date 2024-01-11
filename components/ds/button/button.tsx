import { cn } from "src/utils/cn";

import { TButton } from "./button.types";
import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";

export function Button({ type = "button", className, children, ...props }: TButton.Props) {
  const { variant = "primary", disabled } = props;

  return (
    <button
      className={cn(
        variant === "primary" && buttonPrimaryVariants({ ...props }),
        variant === "secondary" && buttonSecondaryVariants({ ...props }),
        variant === "tertiary" && buttonTertiaryVariants({ ...props }),
        className
      )}
      disabled={disabled}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
}
