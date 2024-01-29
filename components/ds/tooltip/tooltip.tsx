import { Tooltip as NextUiTooltip } from "@nextui-org/react";
import { TTooltip } from "components/ds/tooltip/tooltip.types";

export function Tooltip({ as: Component = "button", content, placement, children }: TTooltip.Props) {
  return (
    <NextUiTooltip content={content} placement={placement} showArrow={true}>
      <Component>{children}</Component>
    </NextUiTooltip>
  );
}
