import { filter } from "lodash";
import { ContributionFragment } from "src/__generated/graphql";
import { GithubContributionType } from "src/types";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";

export const filterUnpaidContributionsByType = (
  type: GithubContributionType,
  contributions: ContributionFragment[]
): ContributionFragment[] => {
  return filter(contributions, {
    status: "complete",
    type: type,
    ignored: false,
  }) as ContributionFragment[];
};

type BudgetT = ProjectBudgetType["budgets"];

export function reorderBudgets(projectBudget: ProjectBudgetType): ProjectBudgetType {
  const order = ["USD", "ETH", "STARK", "OP", "APT"];

  const sortedBudgets = projectBudget.budgets.sort((a: BudgetT[number], b: BudgetT[number]) => {
    if (a.remaining === 0 && b.remaining === 0) {
      // If both budgets have a remaining value of 0, maintain the existing order
      return order.indexOf(a.currency) - order.indexOf(b.currency);
    } else if (a.remaining === 0) {
      // If only budget a has a remaining value of 0, move it to the end
      return 1;
    } else if (b.remaining === 0) {
      // If only budget b has a remaining value of 0, move it to the end
      return -1;
    } else {
      // If both budgets have a non-zero remaining value, sort based on the order array
      return order.indexOf(a.currency) - order.indexOf(b.currency);
    }
  });

  projectBudget.budgets = sortedBudgets;
  return projectBudget;
}
