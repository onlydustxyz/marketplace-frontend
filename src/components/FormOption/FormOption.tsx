import { ComponentPropsWithoutRef, ElementType, ForwardedRef, PropsWithChildren, forwardRef } from "react";
import { cn } from "src/utils/cn";

export enum Size {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

export enum Variant {
  Default = "default",
  Transparent = "transparent",
  Active = "active",
}

export const FormOption = forwardRef(function FormOption<T extends ElementType = "div">(
  {
    as,
    children,
    className,
    size,
    variant = Variant.Default,
    ...restProps
  }: PropsWithChildren<{ as?: T; className?: string; size: Size; variant?: Variant } & ComponentPropsWithoutRef<T>>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const Component = as ?? "div";

  return (
    <Component
      ref={ref}
      className={cn(
        // Base styles
        "flex cursor-pointer select-none items-center gap-1 whitespace-nowrap border font-walsheim font-normal leading-none text-snow",

        // ProfileRadioGroup styles
        "peer-checked:border-spacePurple-500 peer-checked:bg-spacePurple-900 peer-checked:outline-double peer-checked:outline-1 peer-checked:outline-spacePurple-500",

        // FormSelect styles
        "ui-selected:pseudo-outline-2 ui-selected:border-transparent ui-selected:bg-spacePurple-900 ui-selected:before:z-10 ui-selected:before:border-spacePurple-500",

        {
          "rounded-lg px-2 py-1 text-xs": size === Size.Sm,
          "rounded-xl px-3 py-2 text-sm": size === Size.Md,
          "rounded-2xl px-4 py-3 text-sm": size === Size.Lg,
        },

        {
          "border-greyscale-50/8 bg-white/8": variant === Variant.Default,
          "border-greyscale-50/8": variant === Variant.Transparent,
          "border-spacePurple-500 bg-spacePurple-900 outline-double outline-1 outline-spacePurple-500":
            variant === Variant.Active,
        },
        className
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
});
