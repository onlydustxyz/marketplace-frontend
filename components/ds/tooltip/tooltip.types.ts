import { TooltipProps } from "@nextui-org/react";

export namespace TTooltip {
  export interface Props extends TooltipProps {
    className?: string;
    enabled?: boolean;
    canInteract?: boolean;
    hasMaxWidth?: boolean;
  }
}
