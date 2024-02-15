import { useState } from "react";

import { BudgetPanel } from "src/_pages/ProjectDetails/Rewards/Budget/Panel";
import { Currency, Money } from "src/types";

import { BudgetCard, CardTypes } from "./BudgetCard";

export type BudgetProps = {
  projectId: string;
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
  projectId,
}: BudgetProps) {
  const [panelOpen, setPanelOpen] = useState<false | "remaining" | "amount">(false);
  const openRemainingBudgetModal = () => {
    setPanelOpen("remaining");
  };
  const openAmountModal = () => {
    setPanelOpen("amount");
  };

  const closePanel = () => {
    setPanelOpen(false);
  };
  const onPanelChange = (value: false | "remaining" | "amount") => {
    setPanelOpen(value);
  };

  return (
    <>
      <div className="grid w-full gap-4 max-[1470px]:grid-cols-2 max-[700px]:grid-cols-1 min-[1470px]:grid-cols-4">
        <BudgetCard
          budget={remainingBudget}
          filteredCurrencies={filteredCurrencies}
          onClick={openRemainingBudgetModal}
        />
        <BudgetCard
          budget={spentAmount}
          type={CardTypes.AmountSpent}
          filteredCurrencies={filteredCurrencies}
          onClick={openAmountModal}
        />
        <BudgetCard sentRewards={sentRewards} type={CardTypes.RewardsSent} />
        <BudgetCard rewardedContributorsCount={rewardedContributorsCount} type={CardTypes.Contributors} />
      </div>
      <BudgetPanel open={panelOpen} onPanelChange={onPanelChange} close={closePanel} projectId={projectId} />
    </>
  );
}
