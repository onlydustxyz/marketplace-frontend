import { FC, PropsWithChildren, useMemo } from "react";
import { cn } from "src/utils/cn";
import { TypographyVariant } from "./typography.type";
import { tv } from "tailwind-variants";

interface TypographyProps extends PropsWithChildren {
  variant?: TypographyVariant;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const typographyVariants = tv({
  variants: {
    font: {
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
});

export const Typography: FC<TypographyProps> = ({ variant = "body-m", className, as, children }) => {
  const getDefaultComponent = (variant: TypographyVariant): keyof JSX.IntrinsicElements => {
    switch (variant) {
      case "title-xl":
        return "h1";
      case "title-l":
        return "h2";
      case "title-m":
        return "h3";
      case "title-s":
        return "h4";
      case "body-l":
        return "p";
      case "body-l-bold":
        return "p";
      case "body-m":
        return "p";
      case "body-m-bold":
        return "p";
      case "body-s":
        return "p";
      case "body-s-bold":
        return "p";
      case "body-xs":
        return "p";
      case "body-xs-bold":
        return "p";

      default:
        return "p";
    }
  };

  const Component = useMemo(() => as || getDefaultComponent(variant), [as, variant]);

  return <Component className={cn(typographyVariants({ font: variant }), className)}>{children}</Component>;
};
