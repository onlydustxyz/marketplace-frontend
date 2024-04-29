"use client";

import { Tooltip as NextUiTooltip } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TTooltip } from "components/ds/tooltip/tooltip.types";

export function Tooltip({
  as: Component = "div",
  children,
  enabled = true,
  canInteract = false,
  hasMaxWidth,
  className,
  ...props
}: TTooltip.Props) {
  if (!enabled) {
    return <Component className={cn("flex", className)}>{children}</Component>;
  }

  return (
    <NextUiTooltip
      {...props}
      showArrow
      closeDelay={50}
      shouldCloseOnBlur
      classNames={{
        base: cn("before:bg-greyscale-800", { "pointer-events-none": !canInteract }),
        content: cn(
          "px-3 py-2 bg-greyscale-800 od-text-body-s text-greyscale-50 rounded-lg shadow-md font-walsheim text-center",
          {
            "max-w-[224px]": hasMaxWidth,
          }
        ),
      }}
    >
      <Component className={cn("flex", className)}>{children}</Component>
    </NextUiTooltip>
  );
}
