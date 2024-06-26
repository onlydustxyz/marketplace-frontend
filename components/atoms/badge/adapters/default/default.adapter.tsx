import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { BadgeDefaultVariants } from "components/atoms/badge/adapters/default/default.variants";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Show } from "components/layout/components-utils/show/show";

import { BadgePort } from "../../badge.types";

export function BadgeDefaultAdapter<C extends ElementType = "div">({
  classNames,
  as,
  htmlProps,
  children,
  hideContent,
  ...props
}: BadgePort<C>) {
  const Component = as || "div";
  const { fitContent, size, colors, style } = props;
  const slots = BadgeDefaultVariants({ fitContent, size, colors, style });

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
