import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import { MagicIcon } from "src/assets/icons/MagicIcon";
import Card from "src/components/Card";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";
import { Contributor } from "src/pages/ProjectDetails/Rewards/RewardForm/types";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionType } from "src/types";
import TagButton from "src/components/TagButton/TagButton";
import { WorkItemFragment, WorkItemType } from "src/__generated/graphql";

type AutoAddProps = {
  contributor: Contributor;
  workItems: WorkItemFragment[];
  onAutoAdd: (type: GithubContributionType) => void;
};

export function AutoAdd({ contributor, workItems, onAutoAdd }: AutoAddProps) {
  const { T } = useIntl();

  const {
    unpaidMergedPullsCount = 0,
    unpaidCompletedIssuesCount = 0,
    unpaidCompletedCodeReviewsCount = 0,
  } = contributor;

  const getWorkItemsCount = (workItemType: WorkItemType) =>
    workItems.filter(({ type }: { type: WorkItemType }) => type === workItemType).length;

  const remainingPullRequests = unpaidMergedPullsCount - getWorkItemsCount(WorkItemType.PullRequest);
  const remainingIssues = unpaidCompletedIssuesCount - getWorkItemsCount(WorkItemType.Issue);
  const remainingCodeReviews = unpaidCompletedCodeReviewsCount - getWorkItemsCount(WorkItemType.CodeReview);
  const hasItems = remainingPullRequests || remainingIssues || remainingCodeReviews;

  return hasItems ? (
    <Card className="flex items-center justify-between bg-whiteFakeOpacity-10 px-4 py-3" padded={false}>
      <div className="flex items-center text-sm font-medium text-spaceBlue-200">
        <MagicIcon className="mr-1" />
        {T("project.details.rewards.autoAdd.label")}
      </div>

      <div className="flex h-2 items-center">
        {remainingPullRequests > 0 ? (
          <TagButton onClick={() => onAutoAdd(GithubContributionType.PullRequest)}>
            <GitMergeLine className="text-spacePurple-500" />
            {T("contributor.table.tooltip.pullRequests", { count: remainingPullRequests })}
          </TagButton>
        ) : null}

        {remainingIssues > 0 ? (
          <TagButton onClick={() => onAutoAdd(GithubContributionType.Issue)}>
            <CheckboxCircleLine className="text-spacePurple-500" />
            {T("contributor.table.tooltip.issues", { count: remainingIssues })}
          </TagButton>
        ) : null}
        {remainingCodeReviews ? (
          <TagButton onClick={() => onAutoAdd(GithubContributionType.CodeReview)}>
            <CodeReviewIcon className="text-spacePurple-500" />
            {T("contributor.table.tooltip.codeReviews", { count: remainingCodeReviews })}
          </TagButton>
        ) : null}
      </div>
    </Card>
  ) : null;
}
