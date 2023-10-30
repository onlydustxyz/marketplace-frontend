import { filter } from "lodash";
import { ContributionFragment, GithubIssueStatus } from "src/__generated/graphql";
import { GithubPullRequestStatus } from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import { GithubCodeReviewStatus, GithubContributionType } from "src/types";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";

const filters = {
  [GithubContributionType.Issue]: { githubIssue: { status: GithubIssueStatus.Completed } },
  [GithubContributionType.PullRequest]: { githubPullRequest: { status: GithubPullRequestStatus.Merged } },
  [GithubContributionType.CodeReview]: { githubCodeReview: { status: GithubCodeReviewStatus.Completed } },
};

export const filterUnpaidContributionsByType = (
  type: GithubContributionType,
  contributions: ContributionFragment[]
): ContributionFragment[] => {
  return filter(contributions, {
    ...filters[type],
    ignored: false,
  }) as ContributionFragment[];
};

type BudgetT = ProjectBudgetType["budgets"];

export function reorderBudgets(projectBudget: ProjectBudgetType): ProjectBudgetType {
  const order = ["USD", "ETH", "STARK", "OP", "APT"];

  const filteredBudgets = projectBudget.budgets.filter((budget: BudgetT[number]) => budget.remaining !== 0);
  const sortedBudgets = filteredBudgets.sort((a: BudgetT[number], b: BudgetT[number]) => {
    return order.indexOf(a.currency) - order.indexOf(b.currency);
  });

  projectBudget.budgets = sortedBudgets;
  return projectBudget;
}
