import { Spinner } from "@nextui-org/react";
import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { RenderWithProps } from "components/layout/components-utils/render-with-props/render-with-props";
import { Show } from "components/layout/components-utils/show/show";
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

  return (
    <Component {...htmlProps} data-state={state} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}
        <RenderWithProps
          Component={Icon}
          props={startIcon}
          overrideProps={{ className: cn(slots.startIcon(), classNames?.startIcon, startIcon?.className) }}
        />
        <Show show={!!children && display !== "icon"}>
          <Typo size={"xs"} as={"span"} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children}
          </Typo>
        </Show>
        <RenderWithProps
          Component={Icon}
          props={endIcon}
          overrideProps={{ className: cn(slots.endIcon(), classNames?.endIcon, endIcon?.className) }}
        />
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
