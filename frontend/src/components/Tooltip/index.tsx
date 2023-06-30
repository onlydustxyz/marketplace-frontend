import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
  [otherProp: string]: unknown;
} & CommonProps &
  PropsWithChildren;

export default function Tooltip({
  id = GLOBAL_TOOLTIP_ID,
  position = TooltipPosition.Bottom,
  anchorSelect,
  children,
  ...rest
}: TooltipProps) {
  return createPortal(
    <ReactTooltip
      id={id}
      place={position}
      anchorSelect={anchorSelect}
      style={{
        background: "#313030",
        fontFamily: "GT Walsheim",
        fontWeight: 400,
        textAlign: "center",
        fontSize: "0.75rem",
        lineHeight: "1rem",
        color: "#F3F0EE",
        borderRadius: 8,
        padding: "12 8",
        opacity: 100,
        zIndex: 10000,
      }}
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
