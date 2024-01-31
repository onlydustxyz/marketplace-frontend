import { Currency, Money } from "src/types";

import { BudgetCard, CardTypes } from "./BudgetCard";

export type BudgetProps = {
  remainingBudget?: Money;
  spentAmount?: Money;
  sentRewards: {
    count?: number;
    total?: number;
  };
  rewardedContributorsCount?: number;
  filteredCurrencies?: Currency[];
};

export function Budget({
  remainingBudget,
  spentAmount,
  sentRewards,
  rewardedContributorsCount,
  filteredCurrencies,
}: BudgetProps) {
  const openRemainingBudgetModal = () => {
    console.log("open remaining");
  };
  const openAmountModal = () => {
    console.log("open amount");
  };

  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BudgetCard budget={remainingBudget} filteredCurrencies={filteredCurrencies} onClick={openRemainingBudgetModal} />
      <BudgetCard
        budget={spentAmount}
        type={CardTypes.AmountSpent}
        filteredCurrencies={filteredCurrencies}
        onClick={openAmountModal}
      />
      <BudgetCard sentRewards={sentRewards} type={CardTypes.RewardsSent} />
      <BudgetCard rewardedContributorsCount={rewardedContributorsCount} type={CardTypes.Contributors} />
    </div>
  );
}
