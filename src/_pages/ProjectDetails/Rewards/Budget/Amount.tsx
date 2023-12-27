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

const currencyIcons: Record<Exclude<Currency, "USD">, ReactElement> = {
  [Currency.ETH]: <Ethereum className="h-4 w-4" />,
  [Currency.LORDS]: <Lords className="h-4 w-4" />,
  [Currency.STARK]: <Starknet />,
  [Currency.OP]: <Optimism />,
  [Currency.APT]: <Aptos />,
  [Currency.USDC]: <Usdc className="h-4 w-4" />,
};

type Amount = {
  budget?: Money;
};

export function Amount({ budget }: Amount) {
  const { T } = useIntl();
  if (!budget) return null;

  const isUsd = !budget?.currency || budget?.currency === Currency.USD;

  return (
    <>
      <>
        {!isUsd ? (
          <Chip className="mr-1 h-5 w-5">{currencyIcons[budget.currency as keyof typeof currencyIcons]}</Chip>
        ) : null}

        {formatMoneyAmount({
          amount: budget.amount || budget.usdEquivalent,
          currency: budget.currency || Currency.USD,
          showCurrency: !budget.currency || budget.currency === Currency.USD,
        })}
      </>

      {!isUsd && budget?.usdEquivalent ? (
        <div
          className="ml-1 mt-2 font-walsheim text-sm text-spaceBlue-50"
          {...withTooltip(T("project.details.remainingBudget.usdInfo"))}
        >
          ~{formatMoneyAmount({ amount: budget.usdEquivalent, currency: Currency.USD })}
        </div>
      ) : null}
    </>
  );
}
