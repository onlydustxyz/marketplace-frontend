import { useContext, useState } from "react";

import { Currency } from "src/types";

import { UserRewardsContext } from "../context/UserRewards";
import { CardTypes, EarningCard } from "./EarningCard";

export function Earning() {
  const { earning, currencies } = useContext(UserRewardsContext);
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
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EarningCard
        amount={earning?.rewardedAmount}
        filteredCurrencies={currencies as Currency[]}
        onClick={openRemainingBudgetModal}
      />
      <EarningCard
        amount={earning?.pendingAmount}
        type={CardTypes.AmountPending}
        filteredCurrencies={currencies as Currency[]}
        onClick={openRemainingBudgetModal}
      />
      <EarningCard receivedRewards={earning?.receivedRewards} type={CardTypes.ReceivedRewards} />
      <EarningCard rewardingProjectsCount={earning?.rewardingProjectsCount} type={CardTypes.Projects} />
    </div>
  );
}
