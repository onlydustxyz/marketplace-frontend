import { Spinner } from "@nextui-org/react";
import { ElementType } from "react";

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
  isLoading,
  ...props
}: TButtonProps<C>) {
  const Component = as || "button";
  const { state = "default", size, display, ...htmlProps } = props;
  const slots = ButtonCoreVariants({
    state: isLoading ? "loading" : state,
    display: isLoading ? "loader" : display,
    size,
  });

  const Icons = (() => ({
    startIcon: startIcon ? (
      <Icon size={16} {...startIcon} className={cn(slots.startIcon(), classNames?.startIcon, startIcon.className)} />
    ) : null,
    endIcon: endIcon ? (
      <Icon size={16} {...endIcon} className={cn(slots.endIcon(), classNames?.endIcon, endIcon.className)} />
    ) : null,
  }))();

  const Content = (() => {
    if (children && display !== "icon") {
      return (
        <Typo size={"xs"} as={"span"} classNames={{ base: cn(slots.label(), classNames?.label) }}>
          {children}
        </Typo>
      );
    }
    return null;
  })();

  return (
    <Component {...htmlProps} data-state={state} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}
        {Icons.startIcon}
        {Content}
        {Icons.endIcon}
        {endContent}
      </div>
      {isLoading && (
        <div className={cn(slots.loaderContainer(), classNames?.loaderContainer)}>
          <Spinner
            size={"sm"}
            classNames={{
              wrapper: "flex-row items-center justify-center flex",
              circle1: cn(slots.spinnerCircle(), classNames?.spinnerCircle),
              circle2: cn(slots.spinnerCircle(), classNames?.spinnerCircle),
            }}
          />
        </div>
      )}
    </Component>
  );
}
