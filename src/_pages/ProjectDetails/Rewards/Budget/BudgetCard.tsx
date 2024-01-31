import { useMemo } from "react";

import InfoIcon from "src/assets/icons/InfoIcon";
import { AvailableConversion } from "src/components/Currency/AvailableConversion";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import HandCoinLine from "src/icons/HandCoinLine";
import Medal2Fill from "src/icons/Medal2Fill";
import User3Line from "src/icons/User3Line";
import { Currency, Money } from "src/types";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Icon } from "components/layout/icon/icon";

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
      return rewardedContributorsCount || 0;
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
  filteredCurrencies?: Currency[];
  onClick?: () => void;
};

export function BudgetCard({
  budget,
  sentRewards,
  rewardedContributorsCount,
  filteredCurrencies,
  type = CardTypes.Remaining,
  onClick,
}: Props) {
  const { T } = useIntl();

  const showFilteredCurrencies = useMemo(() => {
    if (filteredCurrencies && (type === CardTypes.Remaining || type === CardTypes.AmountSpent)) {
      return (
        <AvailableConversion
          currencies={filteredCurrencies.map(c => ({
            currency: c,
            amount: undefined,
            dollar: undefined,
          }))}
        />
      );
    }

    return null;
  }, []);

  return (
    <Card
      className={cn("group px-4 py-5 transition-all lg:px-4 lg:py-5", {
        // "od-bg-budget bg-origin-border": type === CardTypes.Remaining,
        // "bg-[length:150%_150%] !duration-500 !ease-in transition-all hover:bg-[100%_100%]":
        "relative z-[1]": type === CardTypes.Remaining,
        "overflow-hidden": type === CardTypes.Remaining,
        "cursor-pointer": !!onClick,
      })}
      onClick={onClick}
    >
      {type === CardTypes.Remaining && (
        <div
          className={cn(
            "absolute bottom-0 left-1/2 top-1/2 -z-[1] aspect-square w-[calc(100%_+_20px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-red-500",
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:h-full after:w-full",
            "after:od-bg-budget after:bg-[length:110%_110%] after:group-hover:animate-budgetcard"
          )}
        ></div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
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
          {!!onClick && <Icon remixName="ri-more-fill" />}
        </div>

        <div className="flex flex-wrap items-baseline justify-between font-belwe text-2xl text-greyscale-50">
          <div>{getContent(type, budget, rewardedContributorsCount, sentRewards)}</div>
          <div>{showFilteredCurrencies}</div>
        </div>
      </div>
    </Card>
  );
}
