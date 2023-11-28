import { ButtonHTMLAttributes, ComponentPropsWithoutRef, PropsWithChildren, forwardRef } from "react";
import { cn } from "src/utils/cn";

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
  Primary = "type-primary",
  Secondary = "type-secondary",
  Ternary = "type-ternary",
}

export enum Width {
  Full = "full",
  Fit = "fit",
}

export enum ButtonAccentColor {
  Purple = "accent-purple",
  Orange = "accent-orange",
}

export enum ButtonOnBackground {
  Default = "bg-default",
  Blue = "bg-blue",
}

const variants: Record<
  ButtonType,
  Record<ButtonAccentColor, Record<"default" | "pressed", string>> &
    Record<ButtonOnBackground, Record<"disabled", string>> &
    Record<"default" | "pressed", string>
> = {
  [ButtonType.Primary]: {
    [ButtonAccentColor.Purple]: {
      default:
        "active:bg-spacePurple-50 active:text-spacePurple-900 active:outline-spacePurple-800 focus-visible:bg-spacePurple-50 focus-visible:text-spacePurple-900 hover:bg-spacePurple-50 hover:text-spacePurple-900",
      pressed: "bg-spacePurple-50 text-spacePurple-900 outline-spacePurple-800",
    },
    [ButtonAccentColor.Orange]: {
      default:
        "active:bg-orange-50 active:text-orange-900 active:outline-orange-800 focus-visible:bg-orange-50 focus-visible:text-orange-900 hover:bg-orange-50 hover:text-orange-900",
      pressed: "bg-orange-50 text-orange-900 outline-orange-800",
    },
    [ButtonOnBackground.Default]: {
      disabled: "shadow-none bg-greyscale-700 text-greyscale-200",
    },
    [ButtonOnBackground.Blue]: {
      disabled: "shadow-none bg-spaceBlue-600 text-spaceBlue-200",
    },
    default: "active:shadow-none active:outline active:outline-4 bg-greyscale-50 text-spaceBlue-900 shadow-bottom-sm",
    pressed: "shadow-none outline outline-4",
  },
  [ButtonType.Secondary]: {
    [ButtonAccentColor.Purple]: {
      default:
        "focus-visible:border-spacePurple-200 focus-visible:text-spacePurple-100 hover:border-spacePurple-200 hover:text-spacePurple-100 active:border-spacePurple-400 active:bg-spacePurple-900 active:text-spacePurple-200",
      pressed: "border-spacePurple-400 bg-spacePurple-900 text-spacePurple-200",
    },
    [ButtonAccentColor.Orange]: {
      default:
        "focus-visible:border-orange-200 focus-visible:text-orange-100 hover:border-orange-200 hover:text-orange-100 active:border-orange-400 active:bg-orange-900 active:text-orange-200",
      pressed: "border-orange-400 bg-orange-900 text-orange-200",
    },
    [ButtonOnBackground.Default]: {
      disabled: "border bg-card-background-medium border-card-border-light text-greyscale-600",
    },
    [ButtonOnBackground.Blue]: {
      disabled: "border bg-card-background-base text-greyscale-50 border-greyscale-50",
    },
    default: "border drop-shadow-bottom-sm bg-white/5 text-greyscale-50",
    pressed: "",
  },
  [ButtonType.Ternary]: {
    [ButtonAccentColor.Purple]: {
      default:
        "text-spacePurple-500 focus-visible:text-spacePurple-400 hover:text-spacePurple-400 active:text-spacePurple-400 active:bg-spacePurple-900",
      pressed: "text-spacePurple-400 bg-spacePurple-900",
    },
    [ButtonAccentColor.Orange]: {
      default:
        "text-orange-500 focus-visible:text-orange-400 hover:text-orange-400 active:text-orange-400 active:bg-orange-900",
      pressed: "text-orange-400 bg-orange-900",
    },
    [ButtonOnBackground.Default]: {
      disabled: "text-greyscale-600",
    },
    [ButtonOnBackground.Blue]: {
      disabled: "text-greyscale-600",
    },
    default: "focus-visible:bg-white/5 hover:bg-white/5",
    pressed: "",
  },
};

type ButtonProps = PropsWithChildren<
  {
    size?: ButtonSize;
    type?: ButtonType;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    width?: Width;
    disabled?: boolean;
    iconOnly?: boolean;
    pressed?: boolean;
    accentColor?: ButtonAccentColor;
    onBackground?: ButtonOnBackground;
  } & Omit<ComponentPropsWithoutRef<"button">, "type">
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = ButtonSize.Lg,
      type = ButtonType.Primary,
      width = Width.Fit,
      disabled = false,
      htmlType = "button",
      iconOnly = false,
      pressed = false,
      children,
      className,
      accentColor = ButtonAccentColor.Purple,
      onBackground = ButtonOnBackground.Default,
      ...otherButtonProps
    },
    ref
  ) => {
    function getVariantStyles() {
      if (disabled) {
        // Disabled styles per type and per background
        return variants[type][onBackground].disabled;
      }

      // Default styles per type and per accent color
      const defaultStyles = [variants[type].default, variants[type][accentColor].default];

      // Pressed styles per type and per accent color
      const pressedStyles = pressed ? [variants[type].pressed, variants[type][accentColor].pressed] : [];

      return [...defaultStyles, ...pressedStyles];
    }

    return (
      <button
        ref={ref}
        className={cn(
          "flex flex-row items-center justify-center font-walsheim font-medium outline-none drop-shadow-bottom-sm",
          {
            "cursor-not-allowed": disabled,
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
          },
          getVariantStyles(),
          className
        )}
        type={htmlType}
        disabled={disabled}
        {...otherButtonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
