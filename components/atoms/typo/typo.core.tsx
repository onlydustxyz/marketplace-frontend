import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Translate } from "components/layout/translate/translate";

import { TTypoProps } from "./typo.types";
import { TypoCoreVariants } from "./typo.variants";

export function TypoCore<C extends ElementType = "span">({
  classNames,
  translate,
  children,
  as,
  htmlProps,
  ...props
}: TTypoProps<C>) {
  const { weight, variant, size, color } = props;
  const slots = TypoCoreVariants({ weight, variant, size, color });
  const Component = as || "span";

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {translate ? <Translate {...translate} /> : children}
    </Component>
  );
}
