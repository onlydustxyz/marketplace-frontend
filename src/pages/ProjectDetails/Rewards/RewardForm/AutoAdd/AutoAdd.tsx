import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import { MagicIcon } from "src/assets/icons/MagicIcon";
import Card from "src/components/Card";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionType } from "src/types";
import TagButton from "src/components/TagButton/TagButton";
import { WorkItemType } from "src/__generated/graphql";
import { filterUnpaidContributionsByType } from "src/pages/ProjectDetails/Rewards/RewardForm/utils";
import { RewardableWorkItem } from "../WorkItemSidePanel/WorkItems/WorkItems";
import { RewardableItem } from "src/api/Project/queries";

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

  console.log("remainingPullRequests", remainingPullRequests);
  console.log("remainingIssues", remainingIssues);
  console.log("remainingCodeReviews", remainingCodeReviews);
  console.log("hasItems", hasItems);

  return hasItems ? (
    <Card className="flex items-center justify-between bg-whiteFakeOpacity-10 px-4 py-3" padded={false}>
      <div className="flex min-w-[90px] items-center text-sm font-medium  text-spaceBlue-200">
        <MagicIcon className="mr-1" />

        {T("project.details.rewards.autoAdd.label")}
      </div>

      <div className="min-h-2 flex grow flex-wrap items-center justify-end gap-1">
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
            <CodeReviewIcon className="h-3 w-3 text-spacePurple-500" />
            <div className="hidden sm:inline">
              {T("contributor.table.tooltip.codeReviews.long", { count: remainingCodeReviews })}
            </div>
            <div className="visible sm:hidden">
              {T("contributor.table.tooltip.codeReviews.short", { count: remainingCodeReviews })}
            </div>
          </TagButton>
        ) : null}
      </div>
    </Card>
  ) : null;
}
