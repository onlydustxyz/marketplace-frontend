import {
  ContributionIcon,
  ContributionIconStatus,
  ContributionIconStatusType,
  ContributionIconType,
} from "src/components/ContributionIcon/ContributionIcon";
import Tooltip, { Variant, TooltipPosition } from "src/components/Tooltip";
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

  const tokens = {
    [ContributionIconType.PullRequest]: {
      [ContributionIconStatus.Cancelled]: "",
      [ContributionIconStatus.Closed]: "contributions.tooltip.dateClosed",
      [ContributionIconStatus.Completed]: "",
      [ContributionIconStatus.Draft]: "contributions.tooltip.dateOpened",
      [ContributionIconStatus.Merged]: "contributions.tooltip.dateMerged",
      [ContributionIconStatus.Open]: "contributions.tooltip.dateOpened",
      [ContributionIconStatus.Pending]: "",
    },
    [ContributionIconType.Issue]: {
      [ContributionIconStatus.Cancelled]: "contributions.tooltip.dateClosed",
      [ContributionIconStatus.Closed]: "",
      [ContributionIconStatus.Completed]: "contributions.tooltip.dateClosed",
      [ContributionIconStatus.Draft]: "contributions.tooltip.dateAssigned",
      [ContributionIconStatus.Merged]: "",
      [ContributionIconStatus.Open]: "contributions.tooltip.dateAssigned",
      [ContributionIconStatus.Pending]: "",
    },
    [ContributionIconType.CodeReview]: {
      [ContributionIconStatus.Cancelled]: "",
      [ContributionIconStatus.Closed]: "",
      [ContributionIconStatus.Completed]: "contributions.tooltip.dateClosed",
      [ContributionIconStatus.Draft]: "",
      [ContributionIconStatus.Merged]: "",
      [ContributionIconStatus.Open]: "",
      [ContributionIconStatus.Pending]: "contributions.tooltip.dateOpened",
    },
  };

  return (
    <Tooltip anchorId={id} clickable position={TooltipPosition.Top} variant={Variant.Blue}>
      <div className="flex items-center gap-2 px-1 py-2">
        <ContributionIcon type={type} status={status} />
        <p className="text-sm">{T(tokens[type][status], { date: formattedDate, time: formattedTime })}</p>
      </div>
    </Tooltip>
  );
}
