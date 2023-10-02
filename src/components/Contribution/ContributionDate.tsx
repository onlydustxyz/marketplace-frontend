import { GithubIssueStatus } from "src/__generated/graphql";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
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

export function ContributionDate({
  id,
  type,
  status,
  date,
  tooltipVariant = Variant.Blue,
}: {
  id: string;
  type: GithubContributionType;
  status: GithubItemStatus;
  date: Date;
  tooltipVariant?: Variant;
}) {
  const { T } = useIntl();

  const tooltipId = `${id}-date-tooltip`;

  // British date format DD/MM/YYYY
  const formattedDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "short" }).format(date);
  // American time format HH:MM AM/PM
  const formattedTime = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);

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
      [GithubCodeReviewStatus.Pending]: "contributions.tooltip.dateOpened",
      [GithubCodeReviewStatus.Completed]: "contributions.tooltip.dateClosed",
    },
  };

  return (
    <>
      <Tooltip id={tooltipId} clickable position={TooltipPosition.Top} variant={tooltipVariant}>
        <div className="flex items-center gap-2 px-1 py-2">
          <ContributionIcon type={type} status={status} />
          <p className="text-sm">
            {T(tokens[type][status as keyof typeof tokens[GithubContributionType]], {
              date: formattedDate,
              time: formattedTime,
            })}
          </p>
        </div>
      </Tooltip>

      <span data-tooltip-id={tooltipId} className="text-sm first-letter:uppercase">
        {displayRelativeDate(date)}
      </span>
    </>
  );
}
