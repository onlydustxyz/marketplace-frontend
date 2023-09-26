import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionIconStatus, GithubContributionIconStatusType, GithubContributionType } from "src/types";

export function ContributionDateTooltip({
  id,
  type,
  status,
  date,
}: {
  id: string;
  type: GithubContributionType;
  status: GithubContributionIconStatusType;
  date: Date;
}) {
  const { T } = useIntl();

  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(date);
  const formattedTime = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);

  const tokens = {
    [GithubContributionType.PullRequest]: {
      [GithubContributionIconStatus.Cancelled]: "",
      [GithubContributionIconStatus.Closed]: "contributions.tooltip.dateClosed",
      [GithubContributionIconStatus.Completed]: "",
      [GithubContributionIconStatus.Draft]: "contributions.tooltip.dateOpened",
      [GithubContributionIconStatus.Merged]: "contributions.tooltip.dateMerged",
      [GithubContributionIconStatus.Open]: "contributions.tooltip.dateOpened",
      [GithubContributionIconStatus.Pending]: "",
    },
    [GithubContributionType.Issue]: {
      [GithubContributionIconStatus.Cancelled]: "contributions.tooltip.dateClosed",
      [GithubContributionIconStatus.Closed]: "",
      [GithubContributionIconStatus.Completed]: "contributions.tooltip.dateClosed",
      [GithubContributionIconStatus.Draft]: "contributions.tooltip.dateAssigned",
      [GithubContributionIconStatus.Merged]: "",
      [GithubContributionIconStatus.Open]: "contributions.tooltip.dateAssigned",
      [GithubContributionIconStatus.Pending]: "",
    },
    [GithubContributionType.CodeReview]: {
      [GithubContributionIconStatus.Cancelled]: "",
      [GithubContributionIconStatus.Closed]: "",
      [GithubContributionIconStatus.Completed]: "contributions.tooltip.dateClosed",
      [GithubContributionIconStatus.Draft]: "",
      [GithubContributionIconStatus.Merged]: "",
      [GithubContributionIconStatus.Open]: "",
      [GithubContributionIconStatus.Pending]: "contributions.tooltip.dateOpened",
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
