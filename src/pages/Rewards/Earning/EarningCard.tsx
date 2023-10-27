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
import { EarningCurrencyType, formatMoneyAmount } from "src/utils/money";
import { ReactElement } from "react";
import { useIntl } from "src/hooks/useIntl";

const earningName: Record<Currency, string> = {
  [Currency.USD]: "reward.details.earning.dolarEarnings",
  [Currency.ETH]: "reward.details.earning.etherEarnings",
  [Currency.STARK]: "reward.details.earning.starkEarnings",
  [Currency.OP]: "reward.details.earning.optimismEarnings",
  [Currency.APT]: "reward.details.earning.aptosEarnings",
};

const earningIcons: Record<Currency, ReactElement> = {
  [Currency.USD]: <DollarCurrency />,
  [Currency.ETH]: <Ethereum className="h-4 w-4" />,
  [Currency.STARK]: <Starknet />,
  [Currency.OP]: <Optimism />,
  [Currency.APT]: <Aptos />,
};

const usdEquivalent = [Currency.ETH, Currency.OP, Currency.APT];

interface Props {
  amount: {
    totalAmount: number;
    currency: EarningCurrencyType;
    totalDollarsEquivalent?: number;
  };
  className?: string;
}

export function EarningCard({ amount, className }: Props) {
  const { T } = useIntl();
  const hasUsdEquivalent = usdEquivalent.includes(amount.currency as Currency);
  const isUsd = amount.currency === Currency.USD;

  return (
    <Card className={cn("p-8", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm text-white">{T(earningName[amount.currency])}</div>
        <div className="flex flex-wrap items-center font-belwe text-2xl text-greyscale-50">
          <Chip className="mr-1 h-5 w-5">{earningIcons[amount.currency]}</Chip>
          {formatMoneyAmount({ amount: amount.totalAmount, currency: amount.currency, showCurrency: false })}
          {!isUsd ? <div className="ml-1 mt-2 text-sm">{amount.currency}</div> : null}

          {hasUsdEquivalent ? (
            <div
              className="ml-1 mt-2 font-walsheim text-xs text-spaceBlue-200"
              {...withTooltip(T("project.details.remainingBudget.usdInfo"))}
            >
              {amount.totalDollarsEquivalent
                ? `~${formatMoneyAmount({ amount: amount.totalDollarsEquivalent, currency: Currency.USD })}`
                : null}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
