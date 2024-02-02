import { useIntl } from "src/hooks/useIntl";
import Folder from "src/icons/FolderLine";
import HandCoinLine from "src/icons/HandCoinLine";
import Loader3Line from "src/icons/Loader3Line";
import StackLine from "src/icons/StackLine";
import { Currency, Money } from "src/types";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";

import { Amount } from "./Amount";
import { Counter } from "./Counter";

export enum CardTypes {
  AmountRewarded,
  AmountPending,
  ReceivedRewards,
  Projects,
}

const earnings = {
  [CardTypes.AmountRewarded]: { title: "reward.earning.amountRewarded", icon: <HandCoinLine /> },
  [CardTypes.AmountPending]: { title: "reward.earning.amountPending", icon: <Loader3Line /> },
  [CardTypes.ReceivedRewards]: { title: "reward.earning.receivedRewards", icon: <StackLine /> },
  [CardTypes.Projects]: { title: "reward.earning.projects", icon: <Folder /> },
};

const getContent = (
  type: CardTypes,
  amount?: Money,
  receivedRewards?: { count?: number; total?: number },
  rewardingProjectsCount?: number
) => {
  switch (type) {
    case CardTypes.ReceivedRewards:
      return <Counter {...receivedRewards} />;
    case CardTypes.Projects:
      return rewardingProjectsCount || 0;
    case CardTypes.AmountPending:
    default:
      return <Amount amount={amount} />;
  }
};

type Props = {
  amount?: Money;
  type?: CardTypes;
  receivedRewards?: { count?: number; total?: number };
  rewardingProjectsCount?: number;
  filteredCurrencies?: Currency[];
  onClick?: () => void;
};

export function EarningCard({
  amount,
  receivedRewards,
  rewardingProjectsCount,
  type = CardTypes.AmountRewarded,
  onClick,
}: Props) {
  const { T } = useIntl();

  return (
    <Card
      className={cn("group px-4 py-5 transition-all lg:px-4 lg:py-5", {
        "relative z-[1] overflow-hidden": type === CardTypes.AmountRewarded,
        "cursor-pointer": !!onClick,
      })}
      onClick={onClick}
    >
      {type === CardTypes.AmountRewarded && (
        <div
          className={cn(
            "absolute bottom-0 left-1/2 top-1/2 -z-[1] aspect-square w-[calc(100%_+_20px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-red-500",
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:h-full after:w-full",
            "after:od-bg-budget after:bg-[length:110%_110%] after:group-hover:animate-budgetcard"
          )}
        ></div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm uppercase text-white">
          <span className="mr-2">{earnings[type].icon}</span>
          <div className="truncate font-semibold">{T(earnings[type].title)}</div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between font-belwe text-2xl text-greyscale-50">
          <div className="flex flex-row flex-wrap items-baseline justify-between">
            {getContent(type, amount, receivedRewards, rewardingProjectsCount)}
          </div>
        </div>
      </div>
    </Card>
  );
}
