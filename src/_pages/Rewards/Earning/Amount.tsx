import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { Money as TMoney } from "src/types";

type Amount = {
  amount?: TMoney;
};

export function Amount({ amount }: Amount) {
  const { T } = useIntl();

  if (!amount) return null;

  const asCurrencyToDisplay = !Money.isFiat(amount.currency) && amount.currency;
  const currency = amount.currency;

  return (
    <>
      {asCurrencyToDisplay ? (
        <Chip className="mr-1 h-5 w-5">{<CurrencyIcons className="h-4 w-4" currency={amount.currency} />}</Chip>
      ) : null}

      {
        Money.format({
          amount: amount.amount || amount.usdEquivalent,
          currency,
          options: {
            currencyClassName: "text-title-s",
          },
        }).html
      }

      {asCurrencyToDisplay && amount.usdEquivalent ? (
        <div
          className="ml-1 mt-2 font-walsheim text-sm text-spaceBlue-50"
          {...withTooltip(T("project.details.remainingBudget.usdInfo"))}
        >
          {
            Money.format({
              amount: amount.usdEquivalent,
              currency: Money.USD,
              options: { prefixAmountWithTilde: true },
            }).string
          }
        </div>
      ) : null}
    </>
  );
}
