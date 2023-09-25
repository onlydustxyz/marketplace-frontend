import {
  ContributionIcon,
  ContributionIconStatus,
  ContributionIconStatusType,
  ContributionIconType,
} from "src/components/ContributionIcon/ContributionIcon";
import Tooltip, { BackgroundVariant, TooltipPosition } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";

export function ContributionDateTooltip({
  id,
  type,
  status,
  date,
}: {
  id: string;
  type: ContributionIconType;
  status: ContributionIconStatusType;
  date: Date;
}) {
  const { T } = useIntl();

  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(date);
  const formattedTime = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);

  return (
    <Tooltip anchorId={id} clickable position={TooltipPosition.Top} variant={BackgroundVariant.Blue}>
      <div className="flex items-center gap-2 px-1 py-2">
        <ContributionIcon type={type} status={status} />
        <p className="text-sm">
          {status === ContributionIconStatus.Open || status === ContributionIconStatus.Draft
            ? T("contributions.tooltip.dateOpen", { date: formattedDate, time: formattedTime })
            : T("contributions.tooltip.dateClosed", { date: formattedDate, time: formattedTime })}
        </p>
      </div>
    </Tooltip>
  );
}
