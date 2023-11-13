import { ComponentProps } from "react";
import { GithubIssueStatus } from "src/__generated/graphql";
import { ContributionIcon, Sizes } from "src/components/Contribution/ContributionIcon";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import {
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
  GithubStatus,
  GithubTypeStatusDict,
} from "src/types";
import { cn } from "src/utils/cn";
import { getFormattedDateGB, getFormattedTimeUS } from "src/utils/date";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getGithubStatusToken } from "src/utils/getGithubStatusToken";

const tokens: GithubTypeStatusDict<string> = {
  [GithubContributionType.PullRequest]: {
    [GithubPullRequestStatus.Open]: "contributions.tooltip.dateOpened",
    [GithubPullRequestStatus.Closed]: "contributions.tooltip.dateClosed",
    [GithubPullRequestStatus.Merged]: "contributions.tooltip.dateMerged",
    [GithubPullRequestDraft.Draft]: "contributions.tooltip.dateOpened",
  },
  [GithubContributionType.Issue]: {
    [GithubIssueStatus.Open]: "contributions.tooltip.dateAssigned",
    [GithubIssueStatus.Completed]: "contributions.tooltip.dateClosed",
    [GithubIssueStatus.Cancelled]: "contributions.tooltip.dateClosed",
  },
  [GithubContributionType.CodeReview]: {
    [GithubCodeReviewStatus.Approved]: "contributions.tooltip.dateApproved",
    [GithubCodeReviewStatus.ChangeRequested]: "contributions.tooltip.dateChangeRequested",
    [GithubCodeReviewStatus.Commented]: "contributions.tooltip.dateCommented",
    [GithubCodeReviewStatus.Completed]: "contributions.tooltip.dateApproved",
    [GithubCodeReviewStatus.Dismissed]: "contributions.tooltip.dateDismissed",
    [GithubCodeReviewStatus.Pending]: "contributions.tooltip.dateAssigned",
  },
};

type ContributionDateProps = {
  id: string;
  type: GithubContributionType;
  status: GithubStatus;
  date: Date;
  withIcon?: boolean;
  tooltipProps?: ComponentProps<typeof Tooltip>;
};

export function ContributionDate({
  id,
  type,
  status,
  date,
  withIcon = false,
  tooltipProps = {
    position: TooltipPosition.Bottom,
    variant: Variant.Default,
  },
}: ContributionDateProps) {
  const { T } = useIntl();

  const tooltipId = `${id}-date-tooltip`;
  const { className, ...rest } = tooltipProps;

  return (
    <>
      <Tooltip id={tooltipId} clickable {...rest}>
        <div className={cn("flex items-center gap-2", className)}>
          <ContributionIcon type={type} status={status} />
          {T(tokens[type][status as keyof typeof tokens[GithubContributionType]] ?? "", {
            date: getFormattedDateGB(date),
            time: getFormattedTimeUS(date),
          })}
        </div>
      </Tooltip>

      <div data-tooltip-id={tooltipId} className="flex items-center gap-1">
        {withIcon ? (
          <>
            <ContributionIcon type={type} status={status} size={withIcon ? Sizes.xs : undefined} />
            <span className="first-letter:uppercase">
              {T(getGithubStatusToken(type, status), { date: displayRelativeDate(date) })}
            </span>
          </>
        ) : (
          <span className="first-letter:uppercase">{displayRelativeDate(date)}</span>
        )}
      </div>
    </>
  );
}
