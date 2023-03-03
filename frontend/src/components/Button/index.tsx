import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum ButtonSize {
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  LgLowHeight = "lg-low-height",
  Lg = "lg",
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
}

export enum Width {
  Full = "full",
  Fit = "fit",
}

type ButtonProps = {
  size?: ButtonSize;
  type?: ButtonType;
  htmlType?: "button" | "submit";
  width?: Width;
  disabled?: boolean;
  [otherProp: string]: unknown;
} & PropsWithChildren;

export default function Button({
  size = ButtonSize.Lg,
  type = ButtonType.Primary,
  width = Width.Fit,
  disabled = false,
  htmlType = "button",
  children,
  ...otherButtonProps
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "flex flex-row justify-center items-center",
        "font-walsheim drop-shadow-bottom-sm font-medium",
        {
          "curost-pointer": !disabled,
          "cursor-not-allowed": disabled,
        },
        {
          "hover:shadow-none": !disabled,
        },
        {
          "shadow-bottom-sm": type === ButtonType.Primary,
          "drop-shadow-bottom-sm": type === ButtonType.Secondary,
        },
        {
          "w-full": width === Width.Full,
          "w-fit": width === Width.Fit,
        },
        {
          "px-6 py-4 h-14 gap-3 rounded-xl": size === ButtonSize.Lg,
          "px-4 py-1.5 h-12 gap-3 rounded-xl": size === ButtonSize.LgLowHeight,
          "text-sm px-4 py-1.5 h-14 gap-2 rounded-xl": size === ButtonSize.Md,
          "text-sm px-4 py-2 h-8 gap-2 rounded-large": size === ButtonSize.Sm,
          "text-xs px-2 py-1 h-6 gap-1 rounded-lg": size === ButtonSize.Xs,
        },
        {
          "bg-greyscale-50": type === ButtonType.Primary,
          "bg-white/5 backdrop-blur-lg border": type === ButtonType.Secondary,
        },
        {
          "text-spaceBlue-900": type === ButtonType.Primary && !disabled,
          "text-greyscale-50": type === ButtonType.Secondary && !disabled,
          "text-spaceBlue-500": disabled,
        },
        {
          "bg-spaceBlue-800": disabled,
          "border-spaceBlue-500": type === ButtonType.Secondary && disabled,
        },
        {
          "hover:text-spacePurple-900 hover:outline hover:outline-4 hover:outline-spacePurple-800 hover:bg-spacePurple-50":
            type === ButtonType.Primary && !disabled,
          "hover:text-spacePurple-400 hover:bg-spacePurple-900 hover:border-spacePurple-400":
            type === ButtonType.Secondary && !disabled,
        }
      )}
      type={htmlType}
      disabled={disabled}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
}
