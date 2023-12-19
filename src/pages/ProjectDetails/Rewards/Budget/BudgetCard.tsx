import InfoIcon from "src/assets/icons/InfoIcon";
import Card from "src/components/Card";
import { withTooltip } from "src/components/Tooltip";
import { Money } from "src/types";
import { cn } from "src/utils/cn";
import { useIntl } from "src/hooks/useIntl";
import HandCoinLine from "src/icons/HandCoinLine";
import Medal2Fill from "src/icons/Medal2Fill";
import User3Line from "src/icons/User3Line";
import { Amount } from "./Amount";
import { Counter } from "./Counter";

export enum CardTypes {
  Remaining,
  AmountSpent,
  RewardsSent,
  Contributors,
}

const budgets = {
  [CardTypes.Remaining]: { title: "project.details.remainingBudget.budget.remaining", icon: <InfoIcon /> },
  [CardTypes.AmountSpent]: { title: "project.details.remainingBudget.budget.spent", icon: <HandCoinLine /> },
  [CardTypes.RewardsSent]: { title: "project.details.remainingBudget.budget.sent", icon: <Medal2Fill /> },
  [CardTypes.Contributors]: { title: "project.details.remainingBudget.budget.contributors", icon: <User3Line /> },
};

const getContent = (
  type: CardTypes,
  budget?: Money,
  rewardedContributorsCount?: number,
  sentRewards?: { count?: number; total?: number }
) => {
  switch (type) {
    case CardTypes.RewardsSent:
      return <Counter {...sentRewards} />;
    case CardTypes.Contributors:
      return rewardedContributorsCount || null;
    case CardTypes.AmountSpent:
    default:
      return <Amount budget={budget} />;
  }
};

type Props = {
  budget?: Money;
  type?: CardTypes;
  sentRewards?: { count?: number; total?: number };
  rewardedContributorsCount?: number;
};

export function BudgetCard({ budget, sentRewards, rewardedContributorsCount, type = CardTypes.Remaining }: Props) {
  const { T } = useIntl();

  return (
    <Card
      className={cn("px-4 py-5 lg:px-4 lg:py-5", {
        "bg-budget bg-origin-border": type === CardTypes.Remaining,
      })}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm uppercase text-white">
          <span
            className="mr-2"
            {...withTooltip(T("project.details.remainingBudget.usdInfoBudgets"), {
              visible: type === CardTypes.Remaining,
            })}
          >
            {budgets[type].icon}
          </span>
          <div className="truncate font-semibold">{T(budgets[type].title)}</div>
        </div>

        <div className="flex flex-wrap items-baseline font-belwe text-2xl text-greyscale-50">
          {getContent(type, budget, rewardedContributorsCount, sentRewards)}
        </div>
      </div>
    </Card>
  );
}
