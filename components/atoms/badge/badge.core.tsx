import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { Show } from "components/layout/components-utils/show/show";

import { TBadgeProps } from "./badge.types";
import { BadgeCoreVariants } from "./badge.variants";

export function BadgeCore<C extends ElementType = "div">({
  classNames,
  as,
  htmlProps,
  children,
  hideContent,
  ...props
}: TBadgeProps<C>) {
  const Component = as || "div";
  const { isFitContent, size, colors } = props;
  const slots = BadgeCoreVariants({ isFitContent, size, colors });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <Show show={!hideContent}>
        <div className={cn(slots.contentWrapper(), classNames?.contentWrapper)}>
          <Typo as={"div"} size={"xs"} classNames={{ base: cn(slots.content(), classNames?.content) }}>
            {children}
          </Typo>
        </div>
      </Show>
    </Component>
  );
}
