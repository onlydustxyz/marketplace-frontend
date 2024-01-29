import { PropsWithChildren } from "react";

import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";

interface Props extends PropsWithChildren {
  visible: boolean;
}

export function OtherContributionTooltip({ visible, children }: Props) {
  const { T } = useIntl();

  return (
    <div
      {...withTooltip(T("reward.table.detailsPanel.rewardItems.otherContributionTooltip"), {
        position: TooltipPosition.TopStart,
        className: "max-w-sm",
        visible,
      })}
    >
      {children}
    </div>
  );
}
