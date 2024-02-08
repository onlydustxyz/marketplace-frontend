import { Tooltip as NextUiTooltip } from "@nextui-org/react";

import { TTooltip } from "components/ds/tooltip/tooltip.types";

export function Tooltip({ as: Component = "div", children, ...props }: TTooltip.Props) {
  return (
    <NextUiTooltip
      {...props}
      showArrow={true}
      classNames={{
        base: "before:bg-greyscale-800",
        content: "px-3 py-2 bg-greyscale-800 od-text-body-s text-greyscale-50 rounded-lg shadow-md font-walsheim",
      }}
    >
      <Component>{children}</Component>
    </NextUiTooltip>
  );
}
