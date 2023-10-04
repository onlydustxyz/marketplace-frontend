import Tooltip, { TooltipPosition } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { GithubIssueStatus } from "src/__generated/graphql";
import Time from "src/icons/TimeLine";
import { GithubCodeReviewStatus, GithubContributionType, GithubPullRequestStatus } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getFormattedDate, getFormattedTime } from "./utils";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";

const creationTokens = {
  [GithubContributionType.PullRequest]: "contributions.tooltip.dateOpened",
  [GithubContributionType.Issue]: "contributions.tooltip.dateAssigned",
  [GithubContributionType.CodeReview]: "contributions.tooltip.dateAssigned",
};

export const iconsStatus = {
  [GithubContributionType.PullRequest]: GithubPullRequestStatus.Open,
  [GithubContributionType.Issue]: GithubIssueStatus.Open,
  [GithubContributionType.CodeReview]: GithubCodeReviewStatus.Pending,
};

type ContributionCreationDateProps = {
  id: string;
  type: GithubContributionType;
  date: Date;
};

export function ContributionCreationDate({ id, type, date }: ContributionCreationDateProps) {
  const { T } = useIntl();

  const tooltipId = `${id}-created-at-tooltip`;
  const creationDateShort = displayRelativeDate(date);
  const creationDate = T(creationTokens[type], {
    date: getFormattedDate(date),
    time: getFormattedTime(date),
  });

  return (
    <>
      <Tooltip id={tooltipId} clickable position={TooltipPosition.Top}>
        <div className="flex items-center gap-2 px-1 py-2">
          <ContributionIcon type={type} status={iconsStatus[type]} />
          <p>{creationDate}</p>
        </div>
      </Tooltip>

      <div data-tooltip-id={tooltipId} className="flex items-center gap-1 first-letter:uppercase">
        <Time />
        {creationDateShort}
      </div>
    </>
  );
}
