import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import IssueOpen from "src/assets/icons/IssueOpen";
import Tooltip, { TooltipPosition } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import Time from "src/icons/TimeLine";
import { GithubContributionType } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getFormattedDate, getFormattedTime } from "./utils";

const creationTokens = {
  [GithubContributionType.PullRequest]: "contributions.tooltip.dateOpened",
  [GithubContributionType.Issue]: "contributions.tooltip.dateAssigned",
  [GithubContributionType.CodeReview]: "contributions.tooltip.dateAssigned",
};

export const icons = {
  [GithubContributionType.PullRequest]: <GitPullRequestLine className="-my-1 text-base text-github-green" />,
  [GithubContributionType.Issue]: <IssueOpen className="fill-github-green p-0.5" />,
  [GithubContributionType.CodeReview]: <CodeReviewIcon className="-my-1 text-base text-github-green" />,
};

type ContributionCreationDateProps = {
  id: string;
  type: GithubContributionType;
  date: Date;
};

export function ContributionCreationDate({ id, type, date }: ContributionCreationDateProps) {
  console.log("RENDER");
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
          {icons[type]}
          <p>{creationDate}</p>
        </div>
      </Tooltip>

      <div data-tooltip-id={tooltipId} className="flex gap-1 first-letter:uppercase">
        <Time />
        {creationDateShort}
      </div>
    </>
  );
}
