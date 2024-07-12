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
}: TooltipPort<C>) {
  const Component = as || "div";
  const slots = TooltipNextUiVariants();

  if (!enabled) {
    return (
      <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
        {children}
      </Component>
    );
  }

  return (
    <NextUiTooltip
      showArrow
      content={content}
      closeDelay={50}
      shouldCloseOnBlur
      classNames={{
        base: cn("before:bg-container-action", { "pointer-events-none": !canInteract }),
        content: cn("p-2 bg-container-action shadow-none text-xs text-1"),
      }}
    >
      <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
        {children}
      </Component>
    </NextUiTooltip>
  );
}
