import { FC, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { VariantProps, tv } from "tailwind-variants";
import { getDefaultComponent } from "./typography.utils";

export type TypographyVariants = VariantProps<typeof typographyVariants>;

interface TypographyProps extends PropsWithChildren, TypographyVariants {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const typographyVariants = tv({
  variants: {
    variant: {
      "title-xl": "text-title-xl",
      "title-l": "text-title-l",
      "title-m": "text-title-m",
      "title-s": "text-title-s",
      "body-l": "text-body-l",
      "body-l-bold": "text-body-l-bold",
      "body-m": "text-body-m",
      "body-m-bold": "text-body-m-bold",
      "body-s": "text-body-s",
      "body-s-bold": "text-body-s-bold",
      "body-xs": "text-body-xs",
      "body-xs-bold": "text-body-xs-bold",
    },
  },
  defaultVariants: {
    variant: "body-m",
  },
});

export const Typography: FC<TypographyProps> = ({ variant, className, as, children }) => {
  const Component = as || getDefaultComponent(variant);

  return <Component className={cn(typographyVariants({ variant }), className)}>{children}</Component>;
};
