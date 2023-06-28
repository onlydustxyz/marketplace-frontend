import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum ButtonSize {
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  LgLowHeight = "lg-low-height",
  Lg = "lg",
  LgRounded = "lg-rounded",
  MdRounded = "md-rounded",
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Ternary = "ternary",
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
  iconOnly?: boolean;
  pressed?: boolean;
  [otherProp: string]: unknown;
} & PropsWithChildren;

export default function Button({
  size = ButtonSize.Lg,
  type = ButtonType.Primary,
  width = Width.Fit,
  disabled = false,
  htmlType = "button",
  iconOnly = false,
  pressed = false,
  children,
  ...otherButtonProps
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "flex flex-row justify-center items-center",
        "font-walsheim drop-shadow-bottom-sm font-medium",
        {
          "cursor-pointer": !disabled,
          "cursor-not-allowed": disabled,
        },

        {
          "shadow-bottom-sm": type === ButtonType.Primary && !disabled && !pressed,

          "bg-greyscale-50 text-spaceBlue-900": type === ButtonType.Primary && !disabled && !pressed,

          "bg-greyscale-700 text-greyscale-500": type === ButtonType.Primary && disabled && !pressed,

          "hover:text-spacePurple-900 hover:bg-spacePurple-50": type === ButtonType.Primary && !disabled && !pressed,

          "active:text-spacePurple-900 active:outline active:outline-4 active:outline-spacePurple-800 active:bg-spacePurple-50 active:shadow-none":
            type === ButtonType.Primary && !disabled,
          "text-spacePurple-900 outline outline-4 outline-spacePurple-800 bg-spacePurple-50 shadow-none":
            type === ButtonType.Primary && !disabled && pressed,
        },

        {
          "drop-shadow-bottom-sm border": type === ButtonType.Secondary,

          "text-greyscale-50 bg-white/5 backdrop-blur-lg": type === ButtonType.Secondary && !disabled && !pressed,

          "text-greyscale-50/8 bg-white/2 border-greyscale-50/8": type === ButtonType.Secondary && disabled && !pressed,

          "hover:text-spacePurple-100 hover:border-spacePurple-200":
            type === ButtonType.Secondary && !disabled && !pressed,

          "active:text-spacePurple-200 active:bg-spacePurple-900 active:border-spacePurple-400":
            type === ButtonType.Secondary && !disabled,
          "text-spacePurple-200 bg-spacePurple-900 border-spacePurple-400":
            type === ButtonType.Secondary && !disabled && pressed,
        },

        {
          "text-spacePurple-500": type === ButtonType.Ternary && !disabled && !pressed,

          "text-greyscale-600": type === ButtonType.Ternary && disabled && !pressed,

          "hover:text-spacePurple-400 hover:bg-white/5": type === ButtonType.Ternary && !disabled && !pressed,

          "active:text-spacePurple-400 active:bg-spacePurple-900": type === ButtonType.Ternary && !disabled,
          "text-spacePurple-400 bg-spacePurple-900": type === ButtonType.Ternary && !disabled && pressed,
        },

        {
          "w-full": width === Width.Full,
          "w-fit": width === Width.Fit && !iconOnly,
        },
        {
          "h-14 gap-3 rounded-xl": size === ButtonSize.Lg,
          "h-12 gap-3 rounded-xl": size === ButtonSize.LgLowHeight,
          "h-11 gap-3 rounded-full": size === ButtonSize.LgRounded,
          "text-base h-12 gap-2 rounded-xl": size === ButtonSize.Md,
          "h-11 gap-2 rounded-full": size === ButtonSize.MdRounded,
          "text-sm h-8 gap-2 rounded-large": size === ButtonSize.Sm,
          "text-xs h-6 gap-1 rounded-lg": size === ButtonSize.Xs,
        },
        !iconOnly && {
          "px-6 py-4": size === ButtonSize.Lg,
          "px-6 py-3": size === ButtonSize.LgRounded,
          "px-4 py-3.5": size === ButtonSize.LgLowHeight || size === ButtonSize.Md,
          "px-4 py-3": size === ButtonSize.MdRounded,
          "px-4 py-2": size === ButtonSize.Sm,
          "px-2 py-1": size === ButtonSize.Xs,
        },
        iconOnly && {
          "p-4 w-14 h-14": size === ButtonSize.Lg,
          "p-3.5 w-12 h-12": size === ButtonSize.LgLowHeight || size === ButtonSize.Md,
          "p-2 w-8 h-8": size === ButtonSize.Sm,
          "p-1 w-6 h-6": size === ButtonSize.Xs,
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
