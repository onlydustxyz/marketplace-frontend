import { ReactElement } from "react";

import Aptos from "src/assets/icons/Aptos";
import Ethereum from "src/assets/icons/Ethereum";
import Lords from "src/assets/icons/Lords";
import Optimism from "src/assets/icons/Optimism";
import Starknet from "src/assets/icons/Starknet";
import Usdc from "src/assets/icons/Usdc";
import { Chip } from "src/components/Chip/Chip";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { Currency, Money } from "src/types";
import { formatMoneyAmount } from "src/utils/money";

const currencyIcons: Record<Money["currency"], ReactElement | null> = {
  [Currency.ETH]: <Ethereum className="h-4 w-4" />,
  [Currency.LORDS]: <Lords className="h-4 w-4" />,
  [Currency.STRK]: <Starknet />,
  [Currency.OP]: <Optimism />,
  [Currency.APT]: <Aptos />,
  [Currency.USDC]: <Usdc className="h-4 w-4" />,
  [Currency.USD]: null,
};

type Amount = {
  amount?: Money;
};

export function Amount({ amount }: Amount) {
  const { T } = useIntl();

  if (!amount) return null;

  const isUsd = !amount.currency || amount.currency === Currency.USD;
  const currency = amount.currency ?? Currency.USD;

  return (
    <>
      {!isUsd ? <Chip className="mr-1 h-5 w-5">{currencyIcons[currency]}</Chip> : null}

      {formatMoneyAmount({
        amount: amount.amount || amount.usdEquivalent,
        currency,
        showCurrency: false,
      })}

      <span className="text-title-s">&nbsp;{currency}</span>

      {!isUsd && amount.usdEquivalent ? (
        <div
          className="ml-1 mt-2 font-walsheim text-sm text-spaceBlue-50"
          {...withTooltip(T("project.details.remainingBudget.usdInfo"))}
        >
          ~{formatMoneyAmount({ amount: amount.usdEquivalent })}
        </div>
      ) : null}
    </>
  );
}
