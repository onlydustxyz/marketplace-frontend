import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { Show } from "components/layout/components-utils/show/show";
import { Icon } from "components/layout/icon/icon";

import { TTagProps } from "./tag.types";
import { TagCoreVariants } from "./tag.variants";

export function TagCore<C extends ElementType = "div">({
  classNames,
  startContent,
  as,
  children,
  endContent,
  htmlProps,
  labelProps = {},
  deletableIconProps = {},
  ...props
}: TTagProps<C>) {
  const { isDeletable, hideText = false, display, size, color, style } = props;
  const Component = as || isDeletable ? "button" : "div";
  const slots = TagCoreVariants({ isDeletable, hideText, display, size, color, style });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}
        <Show show={!!children && !hideText}>
          <Typo size={"xs"} as={"span"} {...labelProps} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children}
          </Typo>
        </Show>
        {endContent}
        <Show show={!!isDeletable}>
          <Icon
            remixName="ri-close-circle-line"
            size={16}
            {...deletableIconProps}
            className={cn(slots.deletableIcon(), classNames?.deletableIcon)}
          />
        </Show>
      </div>
    </Component>
  );
}
