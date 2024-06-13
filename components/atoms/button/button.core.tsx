import { ElementType, useMemo } from "react";

import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

import { TButtonProps } from "./button.types";
import { ButtonCoreVariants } from "./button.variants";

export function ButtonCore<C extends ElementType = "button">({
  classNames,
  as,
  startIcon,
  endIcon,
  startContent,
  endContent,
  children,
  ...props
}: TButtonProps<C>) {
  const Component = as || "button";
  const { state = "default", size, ...htmlProps } = props;
  const slots = ButtonCoreVariants({ state, size });

  const Icons = useMemo(
    () => ({
      startIcon: startIcon ? (
        <Icon size={16} {...startIcon} className={cn(slots.startIcon(), classNames?.startIcon, startIcon.className)} />
      ) : null,
      endIcon: endIcon ? (
        <Icon size={16} {...endIcon} className={cn(slots.endIcon(), classNames?.endIcon, endIcon.className)} />
      ) : null,
    }),
    [startIcon, endIcon]
  );

  return (
    <Component {...htmlProps} data-state={state} className={cn(slots.base(), classNames?.base)}>
      {startContent}
      {Icons.startIcon}
      <Typo size={"xs"} as={"p"} classNames={{ base: cn(slots.content(), classNames?.content) }}>
        {children}
      </Typo>
      {Icons.endIcon}
      {endContent}
    </Component>
  );
}
