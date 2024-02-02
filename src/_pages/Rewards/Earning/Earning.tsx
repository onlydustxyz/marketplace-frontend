import { useContext } from "react";

import { Currency } from "src/types";

import { UserRewardsContext } from "../context/UserRewards";
import { CardTypes, EarningCard } from "./EarningCard";

export function Earning() {
  const { earning, currencies } = useContext(UserRewardsContext);
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EarningCard amount={earning?.rewardedAmount} filteredCurrencies={currencies as Currency[]} />
      <EarningCard
        amount={earning?.pendingAmount}
        type={CardTypes.AmountPending}
        filteredCurrencies={currencies as Currency[]}
      />
      <EarningCard receivedRewards={earning?.receivedRewards} type={CardTypes.ReceivedRewards} />
      <EarningCard rewardingProjectsCount={earning?.rewardingProjectsCount} type={CardTypes.Projects} />
    </div>
  );
}
