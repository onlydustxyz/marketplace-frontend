import { Money } from "utils/Money/Money";

import { ProjectBudgetType } from "src/types";

type BudgetT = ProjectBudgetType["budgets"];

export function reorderBudgets(projectBudget: ProjectBudgetType): ProjectBudgetType {
  const order = Money.Static.CurrencyOrder;

  const sortedBudgets = projectBudget.budgets.sort((a: BudgetT[number], b: BudgetT[number]) => {
    if (a.remaining === 0 && b.remaining === 0) {
      // If both budgets have a remaining value of 0, maintain the existing order
      return order.indexOf(a.currency.id) - order.indexOf(b.currency.id);
    } else if (a.remaining === 0) {
      // If only budget a has a remaining value of 0, move it to the end
      return 1;
    } else if (b.remaining === 0) {
      // If only budget b has a remaining value of 0, move it to the end
      return -1;
    } else {
      // If both budgets have a non-zero remaining value, sort based on the order array
      return order.indexOf(a.currency.id) - order.indexOf(b.currency.id);
    }
  });

  projectBudget.budgets = sortedBudgets;
  return projectBudget;
}
