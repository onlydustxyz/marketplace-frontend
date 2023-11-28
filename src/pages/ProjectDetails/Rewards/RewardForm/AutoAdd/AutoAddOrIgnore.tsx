import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import Card from "src/components/Card";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionType } from "src/types";
import { WorkItemType } from "src/__generated/graphql";
import { filterUnpaidContributionsByType } from "src/pages/ProjectDetails/Rewards/RewardForm/utils";
import { RewardableWorkItem } from "../WorkItemSidePanel/WorkItems/WorkItems";
import { RewardableItem } from "src/api/Project/queries";
import ContributionQuickActions from "../ContributionQuickActions";

type AutoAddOrIgnoreProps = {
  unpaidContributions: RewardableItem[];
  workItems: RewardableWorkItem[];
  onAutoAdd: (type: GithubContributionType) => void;
  onAutoIgnore: (type: GithubContributionType) => void;
};

export function AutoAddOrIgnore({ unpaidContributions, workItems, onAutoAdd, onAutoIgnore }: AutoAddOrIgnoreProps) {
  const { T } = useIntl();

  const getWorkItemsCount = (workItemType: WorkItemType) =>
    workItems.filter(({ type }: { type: WorkItemType }) => type === workItemType).length;

  const remainingPullRequests =
    filterUnpaidContributionsByType(GithubContributionType.PullRequest, unpaidContributions).length -
    getWorkItemsCount(WorkItemType.PullRequest);

  const remainingIssues =
    filterUnpaidContributionsByType(GithubContributionType.Issue, unpaidContributions).length -
    getWorkItemsCount(WorkItemType.Issue);

  const remainingCodeReviews =
    filterUnpaidContributionsByType(GithubContributionType.CodeReview, unpaidContributions).length -
    getWorkItemsCount(WorkItemType.CodeReview);

  const hasItems = remainingPullRequests || remainingIssues || remainingCodeReviews;

  return hasItems ? (
    <Card className="flex items-center justify-between bg-whiteFakeOpacity-10 px-4 py-3" padded={false}>
      <div className="flex min-w-[90px] items-center text-sm font-medium  text-spaceBlue-200">
        {T("project.details.rewards.quickActions.label")}
      </div>

      <div className="min-h-2 flex grow flex-wrap items-center justify-end gap-1">
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
