import { Tooltip as NextUiTooltip } from "@nextui-org/tooltip";
import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { TooltipPort } from "../../tooltip.types";
import { TooltipNextUiVariants } from "./next-ui.variants";

export function TooltipNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  content,
  htmlProps,
  enabled = true,
  canInteract = false,
  children,
  placement = "top",
}: TooltipPort<C>) {
  const Component = as || "div";
  const slots = TooltipNextUiVariants();

  if (!enabled) {
    return (
      <Component {...htmlProps} className={cn(slots.wrapper(), classNames?.wrapper)}>
        {children}
      </Component>
    );
  }

  return (
    <NextUiTooltip
      content={content}
      closeDelay={50}
      shouldCloseOnBlur
      classNames={{
        base: cn("before:bg-container-action", { "pointer-events-none": !canInteract }),
        content: cn(slots.tooltip(), classNames?.tooltip),
      }}
      placement={placement}
    >
      <Component {...htmlProps} className={cn(slots.wrapper(), classNames?.wrapper)}>
        {children}
      </Component>
    </NextUiTooltip>
  );
}
