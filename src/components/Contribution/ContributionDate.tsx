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
    [GithubPullRequestStatus.Open]: "githubPullRequest.status.merged",
    [GithubPullRequestStatus.Closed]: "githubPullRequest.status.closed",
    [GithubPullRequestStatus.Merged]: "githubPullRequest.status.merged",
    [GithubPullRequestDraft.Draft]: "githubPullRequest.status.merged",
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

export function ContributionDate({
  id,
  type,
  status,
  date,
  tooltipVariant = Variant.Blue,
  withIcon = false,
}: {
  id: string;
  type: GithubContributionType;
  status: GithubItemStatus;
  date: Date;
  tooltipVariant?: Variant;
  withIcon?: boolean;
}) {
  const { T } = useIntl();

  const tooltipId = `${id}-date-tooltip`;

  // British date format DD/MM/YYYY
  const formattedDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "short" }).format(new Date(date));
  // American time format HH:MM AM/PM
  const formattedTime = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(new Date(date));

  return (
    <>
      <Tooltip id={tooltipId} clickable position={TooltipPosition.Top} variant={tooltipVariant}>
        <div className="flex items-center gap-2 px-1 py-2">
          <ContributionIcon type={type} status={status} />
          <p>
            {T(tokens[type][status as keyof typeof tokens[GithubContributionType]], {
              date: formattedDate,
              time: formattedTime,
            })}
          </p>
        </div>
      </Tooltip>

      <div data-tooltip-id={tooltipId} className="flex items-center gap-1 first-letter:uppercase">
        {withIcon ? (
          <>
            <ContributionIcon type={type} status={status} size={withIcon ? Sizes.xs : undefined} />
            {T(tokensShort[type][status as keyof typeof tokensShort[GithubContributionType]], {
              date: displayRelativeDate(date),
            })}
          </>
        ) : (
          displayRelativeDate(date)
        )}
      </div>
    </>
  );
}
