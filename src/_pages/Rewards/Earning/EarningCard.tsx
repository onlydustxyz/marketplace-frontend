import Card from "src/components/Card";
import { Money } from "src/types";
import { cn } from "src/utils/cn";
import { useIntl } from "src/hooks/useIntl";
import HandCoinLine from "src/icons/HandCoinLine";
import { Amount } from "./Amount";
import { Counter } from "./Counter";
import Loader3Line from "src/icons/Loader3Line";
import StackLine from "src/icons/StackLine";
import Folder from "src/icons/FolderLine";

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
};

export function EarningCard({
  amount,
  receivedRewards,
  rewardingProjectsCount,
  type = CardTypes.AmountRewarded,
}: Props) {
  const { T } = useIntl();

  return (
    <Card
      className={cn("px-4 py-5 lg:px-4 lg:py-5", {
        "bg-budget bg-origin-border": type === CardTypes.AmountRewarded,
      })}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm uppercase text-white">
          <span className="mr-2">{earnings[type].icon}</span>
          <div className="truncate font-semibold">{T(earnings[type].title)}</div>
        </div>

        <div className="flex flex-wrap items-baseline font-belwe text-2xl text-greyscale-50">
          {getContent(type, amount, receivedRewards, rewardingProjectsCount)}
        </div>
      </div>
    </Card>
  );
}
