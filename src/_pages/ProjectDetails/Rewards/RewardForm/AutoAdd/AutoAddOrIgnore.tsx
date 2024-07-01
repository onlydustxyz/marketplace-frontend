import { CompletedRewardableItem } from "src/api/Project/queries";
import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import Card from "src/components/Card";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";
import { GithubContributionType, WorkItemType } from "src/types";

import { useIntl } from "hooks/translate/use-translate";

import ContributionQuickActions from "../ContributionQuickActions";
import { RewardableWorkItem } from "../WorkItemSidePanel/WorkItems/WorkItems";

type AutoAddOrIgnoreProps = {
  unpaidContributions: CompletedRewardableItem;
  workItems: RewardableWorkItem[];
  onAutoAdd: (type: GithubContributionType) => void;
  onAutoIgnore: (type: GithubContributionType) => void;
};

export function AutoAddOrIgnore({ unpaidContributions, workItems, onAutoAdd, onAutoIgnore }: AutoAddOrIgnoreProps) {
  const { T } = useIntl();

  const getWorkItemsCount = (workItemType: WorkItemType) =>
    workItems.filter(({ type, githubIssue, githubPullRequest, githubCodeReview }: RewardableWorkItem) => {
      if (type !== workItemType) return false;

      const typeToItemMap = {
        [WorkItemType.Issue]: githubIssue,
        [WorkItemType.PullRequest]: githubPullRequest,
        [WorkItemType.CodeReview]: githubCodeReview,
      };

      const relevantItem = typeToItemMap[type];
      return relevantItem && relevantItem.contributionId != null;
    }).length;

  const remainingPullRequests =
    unpaidContributions?.rewardablePullRequests.length - getWorkItemsCount(WorkItemType.PullRequest);

  const remainingIssues = unpaidContributions?.rewardableIssues.length - getWorkItemsCount(WorkItemType.Issue);

  const remainingCodeReviews =
    unpaidContributions?.rewardableCodeReviews.length - getWorkItemsCount(WorkItemType.CodeReview);

  const hasItems = remainingPullRequests || remainingIssues || remainingCodeReviews;

  return hasItems ? (
    <Card className="flex items-center justify-between bg-whiteFakeOpacity-10 px-4 py-3" padded={false}>
      <div className="flex min-w-[90px] items-center text-sm font-medium  text-spaceBlue-200">
        {T("project.details.rewards.quickActions.label")}
      </div>

      <div className="flex min-h-2 grow flex-wrap items-center justify-end gap-1">
        <ContributionQuickActions
          remainingCount={remainingPullRequests}
          contributionType={GithubContributionType.PullRequest}
          onAutoAdd={onAutoAdd}
          onAutoIgnore={onAutoIgnore}
          IconComponent={GitMergeLine}
          tooltipLong="contributor.table.tooltip.pullRequests"
          tooltipShort="contributor.table.tooltip.pullRequests"
        />
        <ContributionQuickActions
          remainingCount={remainingIssues}
          contributionType={GithubContributionType.Issue}
          onAutoAdd={onAutoAdd}
          onAutoIgnore={onAutoIgnore}
          IconComponent={CheckboxCircleLine}
          tooltipLong="contributor.table.tooltip.issues"
          tooltipShort="contributor.table.tooltip.issues"
        />
        <ContributionQuickActions
          remainingCount={remainingCodeReviews}
          contributionType={GithubContributionType.CodeReview}
          onAutoAdd={onAutoAdd}
          onAutoIgnore={onAutoIgnore}
          IconComponent={CodeReviewIcon}
          tooltipLong="contributor.table.tooltip.codeReviews.long"
          tooltipShort="contributor.table.tooltip.codeReviews.short"
        />
      </div>
    </Card>
  ) : null;
}
