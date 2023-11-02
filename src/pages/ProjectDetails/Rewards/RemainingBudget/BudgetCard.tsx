import Aptos from "src/assets/icons/Aptos";
import { DollarCurrency } from "src/assets/icons/DollarCurrency";
import Ethereum from "src/assets/icons/Ethereum";
import Optimism from "src/assets/icons/Optimism";
import Starknet from "src/assets/icons/Starknet";
import Card from "src/components/Card";
import { Chip } from "src/components/Chip/Chip";
import { withTooltip } from "src/components/Tooltip";
import { Currency } from "src/types";
import { cn } from "src/utils/cn";
import { BudgetCurrencyType, formatMoneyAmount } from "src/utils/money";
import { LeftToSpend } from "./LeftToSpend";
import { ReactElement } from "react";
import { useIntl } from "src/hooks/useIntl";
import RewardBudgetBar from "src/components/RewardBudget/BudgetBar/RewardBudgetBar";

const budgetName: Record<Currency, string> = {
  [Currency.USD]: "project.details.remainingBudget.budget.dollars",
  [Currency.ETH]: "project.details.remainingBudget.budget.ether",
  [Currency.STARK]: "project.details.remainingBudget.budget.stark",
  [Currency.OP]: "project.details.remainingBudget.budget.optimism",
  [Currency.APT]: "project.details.remainingBudget.budget.aptos",
};

const budgetIcons: Record<Currency, ReactElement> = {
  [Currency.USD]: <DollarCurrency />,
  [Currency.ETH]: <Ethereum className="h-4 w-4" />,
  [Currency.STARK]: <Starknet />,
  [Currency.OP]: <Optimism />,
  [Currency.APT]: <Aptos />,
};

const usdEquivalent = [Currency.ETH, Currency.OP, Currency.APT];

interface Props {
  budget: {
    initialAmount: number;
    remaining: number;
    currency: BudgetCurrencyType;
    initialDollarsEquivalent?: number;
  };
  className?: string;
}

export function BudgetCard({ budget, className }: Props) {
  const { T } = useIntl();
  const hasUsdEquivalent = usdEquivalent.includes(budget.currency as Currency);
  const isUsd = budget.currency === Currency.USD;

  return (
    <Card className={cn("p-8", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm text-white">{T(budgetName[budget.currency])}</div>
        <div className="flex flex-wrap items-center font-belwe text-2xl text-greyscale-50">
          <Chip className="mr-1 h-5 w-5">{budgetIcons[budget.currency]}</Chip>
          {formatMoneyAmount({ amount: budget.remaining, currency: budget.currency, showCurrency: false })}
          {!isUsd ? <div className="ml-1 mt-2 text-sm">{budget.currency}</div> : null}

          {hasUsdEquivalent ? (
            <div
              className="ml-1 mt-2 font-walsheim text-xs text-spaceBlue-200"
              {...withTooltip(T("project.details.remainingBudget.usdInfo"))}
            >
              ~
              {budget.initialDollarsEquivalent
                ? formatMoneyAmount({ amount: budget.initialDollarsEquivalent, currency: Currency.USD })
                : null}
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <RewardBudgetBar total={budget.initialAmount} remaining={budget.remaining} spending={0} />
          <LeftToSpend budget={budget} />
        </div>
      </div>
    </Card>
  );
}
