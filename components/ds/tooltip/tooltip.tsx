import { Tooltip as NextUiTooltip } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TTooltip } from "components/ds/tooltip/tooltip.types";

export function Tooltip({
  as: Component = "div",
  children,
  enabled = true,
  canInteract = false,
  ...props
}: TTooltip.Props) {
  if (!enabled) {
    return <Component>{children}</Component>;
  }

  return (
    <NextUiTooltip
      {...props}
      showArrow={true}
      closeDelay={50}
      shouldCloseOnBlur={true}
      classNames={{
        base: cn("before:bg-greyscale-800", { "pointer-events-none": !canInteract }),
        content: "px-3 py-2 bg-greyscale-800 od-text-body-s text-greyscale-50 rounded-lg shadow-md font-walsheim",
      }}
    >
      <Component>{children}</Component>
    </NextUiTooltip>
  );
}
