import classNames from "classnames";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { cn } from "src/utils/cn";

export enum TooltipPosition {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
}

const GLOBAL_TOOLTIP_ID = "global-tooltip";

type CommonProps = {
  position?: TooltipPosition;
  visible?: boolean;
};

type TooltipProps = {
  id?: string;
  anchorSelect?: string;
  anchorId?: string;
  variant?: Variant;
  [otherProp: string]: unknown;
  className?: string;
  delayShow?: number;
} & CommonProps &
  PropsWithChildren;

export enum Variant {
  Default,
  Blue,
}

const variants = {
  [Variant.Default]: "bg-greyscale-800",
  [Variant.Blue]: "bg-tooltip-blue",
};

export default function Tooltip({
  id = GLOBAL_TOOLTIP_ID,
  position = TooltipPosition.Bottom,
  anchorId,
  anchorSelect,
  children,
  variant = Variant.Default,
  className,
  delayShow = 100,
  ...rest
}: TooltipProps) {
  return createPortal(
    <ReactTooltip
      id={id}
      place={position}
      anchorId={anchorId}
      anchorSelect={anchorSelect}
      delayShow={delayShow}
      className={cn(
        "opaque z-50 rounded-lg px-3 py-2 text-center font-walsheim text-sm font-normal text-greyscale-50",
        variants[variant],
        className
      )}
      render={({ content, activeAnchor }) =>
        content ? (
          <div className={activeAnchor?.getAttribute("data-tooltip-classname") || undefined}>{content}</div>
        ) : (
          children
        )
      }
      {...rest}
    />,
    document.body
  );
}

type WithTooltipOptions = { className?: string } & CommonProps;

export function withTooltip(content: string, options?: WithTooltipOptions) {
  const { visible = true, position = TooltipPosition.Bottom, className } = options || {};

  return {
    "data-tooltip-id": GLOBAL_TOOLTIP_ID,
    "data-tooltip-content": content,
    "data-tooltip-place": position,
    "data-tooltip-classname": className,
    "data-tooltip-hidden": !visible,
  };
}

export const withCustomTooltip = (id: string) => ({
  "data-tooltip-id": id,
});
