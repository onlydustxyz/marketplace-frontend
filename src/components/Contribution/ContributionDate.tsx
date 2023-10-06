import { GithubIssueStatus } from "src/__generated/graphql";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import {
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubItemStatus,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
  GithubTypeStatusDict,
} from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { ContributionIcon, Sizes } from "./ContributionIcon";
import { getFormattedDateGB, getFormattedTimeUS } from "src/utils/date";
import { ComponentProps } from "react";
import { cn } from "src/utils/cn";

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
    [GithubCodeReviewStatus.Pending]: "contributions.tooltip.dateAssigned",
    [GithubCodeReviewStatus.Completed]: "contributions.tooltip.dateApproved",
    [GithubCodeReviewStatus.ChangeRequested]: "contributions.tooltip.dateChangeRequested",
  },
};

const tokensShort: GithubTypeStatusDict<string> = {
  [GithubContributionType.PullRequest]: {
    [GithubPullRequestStatus.Open]: "githubPullRequest.status.open",
    [GithubPullRequestStatus.Closed]: "githubPullRequest.status.closed",
    [GithubPullRequestStatus.Merged]: "githubPullRequest.status.merged",
    [GithubPullRequestDraft.Draft]: "githubPullRequest.status.open",
  },
  [GithubContributionType.Issue]: {
    [GithubIssueStatus.Open]: "githubIssue.status.open",
    [GithubIssueStatus.Completed]: "githubIssue.status.closed",
    [GithubIssueStatus.Cancelled]: "githubIssue.status.closed",
  },
  [GithubContributionType.CodeReview]: {
    [GithubCodeReviewStatus.Pending]: "githubCodeReview.status.pending",
    [GithubCodeReviewStatus.Completed]: "githubCodeReview.status.approved",
    [GithubCodeReviewStatus.ChangeRequested]: "githubCodeReview.status.changeRequested",
  },
};

type ContributionDateProps = {
  id: string;
  type: GithubContributionType;
  status: GithubItemStatus;
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
    position: TooltipPosition.Top,
    variant: Variant.Blue,
  },
}: ContributionDateProps) {
  const { T } = useIntl();

  const tooltipId = `${id}-date-tooltip`;
  const { className, ...rest } = tooltipProps;

  // Even though a type and status should always be defined, in development sometimes they aren't and makes the component crash.
  return (
    <>
      <Tooltip id={tooltipId} clickable {...rest}>
        <div className={cn("flex items-center gap-2 px-1 py-2", className)}>
          <ContributionIcon type={type} status={status} />

          {type && status
            ? T(tokens[type][status as keyof typeof tokens[GithubContributionType]], {
                date: getFormattedDateGB(date),
                time: getFormattedTimeUS(date),
              })
            : null}
        </div>
      </Tooltip>

      <div data-tooltip-id={tooltipId} className="flex items-center gap-1 first-letter:uppercase">
        {withIcon ? (
          <>
            <ContributionIcon type={type} status={status} size={withIcon ? Sizes.xs : undefined} />
            {type && status
              ? T(tokensShort[type][status as keyof typeof tokensShort[GithubContributionType]], {
                  date: displayRelativeDate(date),
                })
              : null}
          </>
        ) : (
          displayRelativeDate(date)
        )}
      </div>
    </>
  );
}
