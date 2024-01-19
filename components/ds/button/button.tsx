import { cn } from "src/utils/cn";
import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";
import { TButton } from "./button.types";

export function Button({ type = "button", variant = "primary", className, ...props }: TButton.Props) {
  return (
    <button
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
