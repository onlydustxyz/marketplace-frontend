import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { ButtonVariants } from "./variants/button.variants";
import { buttonPrimaryVariants } from "./variants/button-primary.variants";
import { buttonSecondaryVariants } from "./variants/button-secondary.variants";
import { buttonTertiaryVariants } from "./variants/button-tertiary.variants";

interface ButtonProps extends PropsWithChildren, ButtonVariants {
  onClick: () => void;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
}

export const Button: FC<ButtonProps> = ({ onClick, htmlType = "button", className, children, ...props }) => {
  const { type = "primary", disabled } = props;

  return (
    <button
      className={cn(
        type === "primary" && buttonPrimaryVariants({ ...props }),
        type === "secondary" && buttonSecondaryVariants({ ...props }),
        type === "tertiary" && buttonTertiaryVariants({ ...props }),
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
    >
      {children}
    </button>
  );
};
