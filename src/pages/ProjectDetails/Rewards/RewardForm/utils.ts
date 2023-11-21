import { filter } from "lodash";
import { GithubContributionType } from "src/types";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";
import { RewardableItem } from "src/api/Project/queries";

export const filterUnpaidContributionsByType = (
  type: GithubContributionType,
  contributions: RewardableItem[]
): RewardableItem[] => {
  return filter(contributions, {
    status: "COMPLETED",
    type,
    ignored: false,
  });
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
