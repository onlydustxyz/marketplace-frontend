import { cn } from "src/utils/cn";
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
      className={cn(
        "flex flex-row items-center justify-center",
        "font-walsheim font-medium drop-shadow-bottom-sm",
        {
          "cursor-pointer": !disabled,
          "cursor-not-allowed": disabled,
        },

        {
          "shadow-bottom-sm": type === ButtonType.Primary && !disabled && !pressed,

          "bg-greyscale-50 text-spaceBlue-900": type === ButtonType.Primary && !disabled && !pressed,

          "bg-greyscale-700 text-greyscale-500": type === ButtonType.Primary && disabled && !pressed,

          "hover:bg-spacePurple-50 hover:text-spacePurple-900": type === ButtonType.Primary && !disabled && !pressed,

          "active:bg-spacePurple-50 active:text-spacePurple-900 active:shadow-none active:outline active:outline-4 active:outline-spacePurple-800":
            type === ButtonType.Primary && !disabled,
          "bg-spacePurple-50 text-spacePurple-900 shadow-none outline outline-4 outline-spacePurple-800":
            type === ButtonType.Primary && !disabled && pressed,
        },

        {
          "border drop-shadow-bottom-sm": type === ButtonType.Secondary,

          "bg-white/5 text-greyscale-50": type === ButtonType.Secondary && !disabled && !pressed,

          "border-greyscale-50/8 bg-white/2 text-greyscale-50/8": type === ButtonType.Secondary && disabled && !pressed,

          "hover:border-spacePurple-200 hover:text-spacePurple-100":
            type === ButtonType.Secondary && !disabled && !pressed,

          "active:border-spacePurple-400 active:bg-spacePurple-900 active:text-spacePurple-200":
            type === ButtonType.Secondary && !disabled,
          "border-spacePurple-400 bg-spacePurple-900 text-spacePurple-200":
            type === ButtonType.Secondary && !disabled && pressed,
        },

        {
          "text-spacePurple-500": type === ButtonType.Ternary && !disabled && !pressed,

          "text-greyscale-600": type === ButtonType.Ternary && disabled && !pressed,

          "hover:bg-white/5 hover:text-spacePurple-400": type === ButtonType.Ternary && !disabled && !pressed,

          "active:bg-spacePurple-900 active:text-spacePurple-400": type === ButtonType.Ternary && !disabled,
          "bg-spacePurple-900 text-spacePurple-400": type === ButtonType.Ternary && !disabled && pressed,
        },

        {
          "w-full": width === Width.Full,
          "w-fit": width === Width.Fit && !iconOnly,
        },
        {
          "h-14 gap-3 rounded-xl": size === ButtonSize.Lg,
          "h-12 gap-3 rounded-xl": size === ButtonSize.LgLowHeight,
          "h-11 gap-3 rounded-full": size === ButtonSize.LgRounded,
          "h-12 gap-2 rounded-xl text-base": size === ButtonSize.Md,
          "h-11 gap-2 rounded-full": size === ButtonSize.MdRounded,
          "h-8 gap-2 rounded-large text-sm": size === ButtonSize.Sm,
          "h-6 gap-1 rounded-lg text-xs": size === ButtonSize.Xs,
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
          "h-14 w-14 p-4": size === ButtonSize.Lg,
          "h-12 w-12 p-3.5": size === ButtonSize.LgLowHeight || size === ButtonSize.Md,
          "h-8 w-8 p-2": size === ButtonSize.Sm,
          "h-6 w-6 p-1": size === ButtonSize.Xs,
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
