import { Tooltip as NextUiTooltip } from "@nextui-org/react";
import { TTooltip } from "components/ds/tooltip/tooltip.types";

export function Tooltip({ as: Component = "div", content, placement, children }: TTooltip.Props) {
  return (
    <NextUiTooltip
      content={content}
      placement={placement}
      showArrow={true}
      classNames={{
        content: ["p-4", "od-text-body-s"],
      }}
    >
      <Component>{children}</Component>
    </NextUiTooltip>
  );
}
