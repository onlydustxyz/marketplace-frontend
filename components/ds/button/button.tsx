import { cn } from "src/utils/cn";
import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";
import { TButton } from "./button.types";

export function Button({ htmlType = "button", className, children, ...props }: TButton.Props) {
  const { type = "primary", disabled } = props;

  return (
    <button
      className={cn(
        type === "primary" && buttonPrimaryVariants({ ...props }),
        type === "secondary" && buttonSecondaryVariants({ ...props }),
        type === "tertiary" && buttonTertiaryVariants({ ...props }),
        className
      )}
      disabled={disabled}
      {...props}
      type={htmlType}
    >
      {children}
    </button>
  );
}
