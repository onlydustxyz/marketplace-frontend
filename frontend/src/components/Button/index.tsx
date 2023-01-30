import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
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
} & PropsWithChildren;

export default function Button({
  size = ButtonSize.Large,
  type = ButtonType.Primary,
  width = Width.Fit,
  disabled = false,
  htmlType = "button",
  children,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "flex flex-row justify-center items-center gap-2",
        "rounded-xl font-walsheim drop-shadow-bottom-sm font-medium",
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
          "px-6 py-4 h-14": size === ButtonSize.Large,
          "text-sm px-4 py-1.5 h-14": size === ButtonSize.Medium,
          "text-sm px-4 py-2 h-8": size === ButtonSize.Small,
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
    >
      {children}
    </button>
  );
}
