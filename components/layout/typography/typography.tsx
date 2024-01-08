import { ElementType, FC, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { VariantProps, tv } from "tailwind-variants";
import { getDefaultComponent } from "./typography.utils";
import Translate, { TranslateProps } from "@/components/layout/translate/translate.tsx";

export type TypographyVariants = VariantProps<typeof typographyVariants>;

interface TypographyProps extends PropsWithChildren, TypographyVariants {
  className?: string;
  as?: ElementType;
  translate?: TranslateProps;
}

export const typographyVariants = tv({
  variants: {
    variant: {
      "title-xl": "od-text-title-xl",
      "title-l": "od-text-title-l",
      "title-m": "od-text-title-m",
      "title-s": "od-text-title-s",
      "body-l": "od-text-body-l",
      "body-l-bold": "od-text-body-l-bold",
      "body-m": "od-text-body-m",
      "body-m-bold": "od-text-body-m-bold",
      "body-s": "od-text-body-s",
      "body-s-bold": "od-text-body-s-bold",
      "body-xs": "od-text-body-xs",
      "body-xs-bold": "od-text-body-xs-bold",
    },
  },
  defaultVariants: {
    variant: "body-m",
  },
});

export const Typography: FC<TypographyProps> = ({ variant, className, as, children, translate }) => {
  const Component = as || getDefaultComponent(variant);

  if (translate) {
    return (
      <Component className={cn(typographyVariants({ variant }), className)}>
        <Translate {...translate} />
        {children}
      </Component>
    );
  }

  return <Component className={cn(typographyVariants({ variant }), className)}>{children}</Component>;
};
