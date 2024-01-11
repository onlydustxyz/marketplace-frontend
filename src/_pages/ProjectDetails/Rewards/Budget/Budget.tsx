import { BudgetCard, CardTypes } from "./BudgetCard";
import { Money } from "src/types";

export type BudgetProps = {
  remainingBudget?: Money;
  spentAmount?: Money;
  sentRewards: {
    count?: number;
    total?: number;
  };
  rewardedContributorsCount?: number;
};

export function Budget({ remainingBudget, spentAmount, sentRewards, rewardedContributorsCount }: BudgetProps) {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BudgetCard budget={remainingBudget} />
      <BudgetCard budget={spentAmount} type={CardTypes.AmountSpent} />
      <BudgetCard sentRewards={sentRewards} type={CardTypes.RewardsSent} />
      <BudgetCard rewardedContributorsCount={rewardedContributorsCount} type={CardTypes.Contributors} />
    </div>
  );
}
