import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import { MagicIcon } from "src/assets/icons/MagicIcon";
import Card from "src/components/Card";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionShortenTypeLabel, GithubContributionType } from "src/types";
import TagButton from "src/components/TagButton/TagButton";
import { WorkItemType } from "src/__generated/graphql";
import { filterUnpaidContributionsByType } from "src/pages/ProjectDetails/Rewards/RewardForm/utils";
import { RewardableWorkItem } from "../WorkItemSidePanel/WorkItems/WorkItems";
import { RewardableItem } from "src/api/Project/queries";
import QuickActionsMenu from "src/pages/ProjectDetails/Rewards/RewardForm/AutoAdd/QuickActionsMenu";

type AutoAddProps = {
  unpaidContributions: RewardableItem[];
  workItems: RewardableWorkItem[];
  onAutoAdd: (type: GithubContributionType) => void;
};

export function AutoAdd({ unpaidContributions, workItems, onAutoAdd }: AutoAddProps) {
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
        <MagicIcon className="mr-1" />

        {T("project.details.rewards.autoAdd.label")}
      </div>

      <div className="min-h-2 flex grow flex-wrap items-center justify-end gap-1">
        {remainingPullRequests > 0 ? (
          <QuickActionsMenu
            add={{
              label: T("project.details.rewards.quickActions.add", {
                count: remainingPullRequests,
                type: GithubContributionShortenTypeLabel.PullRequest,
              }),
              onClick: () => onAutoAdd(GithubContributionType.PullRequest),
            }}
            ignore={{
              label: T("project.details.rewards.quickActions.ignore", {
                count: remainingPullRequests,
                type: GithubContributionShortenTypeLabel.PullRequest,
              }),
              onClick: () => console.log("ignore all"),
            }}
          >
            <TagButton>
              <GitMergeLine className="text-spacePurple-500" />
              {T("contributor.table.tooltip.pullRequests", { count: remainingPullRequests })}
            </TagButton>
          </QuickActionsMenu>
        ) : null}

        {remainingIssues > 0 ? (
          <QuickActionsMenu
            add={{
              label: T("project.details.rewards.quickActions.add", {
                count: remainingIssues,
                type: GithubContributionShortenTypeLabel.Issue,
              }),
              onClick: () => onAutoAdd(GithubContributionType.Issue),
            }}
            ignore={{
              label: T("project.details.rewards.quickActions.ignore", {
                count: remainingIssues,
                type: GithubContributionShortenTypeLabel.Issue,
              }),
              onClick: () => console.log("ignore all"),
            }}
          >
            <TagButton>
              <CheckboxCircleLine className="text-spacePurple-500" />
              {T("contributor.table.tooltip.issues", { count: remainingIssues })}
            </TagButton>
          </QuickActionsMenu>
        ) : null}
        {remainingCodeReviews ? (
          <QuickActionsMenu
            add={{
              label: T("project.details.rewards.quickActions.add", {
                count: remainingCodeReviews,
                type: GithubContributionShortenTypeLabel.CodeReview,
              }),
              onClick: () => onAutoAdd(GithubContributionType.CodeReview),
            }}
            ignore={{
              label: T("project.details.rewards.quickActions.ignore", {
                count: remainingCodeReviews,
                type: GithubContributionShortenTypeLabel.CodeReview,
              }),
              onClick: () => console.log("ignore all"),
            }}
          >
            <TagButton>
              <CodeReviewIcon className="h-3 w-3 text-spacePurple-500" />
              <div className="hidden sm:inline">
                {T("contributor.table.tooltip.codeReviews.long", { count: remainingCodeReviews })}
              </div>
              <div className="visible sm:hidden">
                {T("contributor.table.tooltip.codeReviews.short", { count: remainingCodeReviews })}
              </div>
            </TagButton>
          </QuickActionsMenu>
        ) : null}
      </div>
    </Card>
  ) : null;
}
