import { useContext, useMemo } from "react";
import { Money } from "utils/Money/Money";

import { UserRewardsContext } from "src/_pages/Rewards/context/UserRewards";
import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { withTooltip } from "src/components/Tooltip";
import { DetailedTotalMoney, Money as TMoney } from "src/types";

import { useIntl } from "hooks/translate/use-translate";

type Amount = {
  amount?: DetailedTotalMoney;
};

export function Amount({ amount }: Amount) {
  const { T } = useIntl();
  const { filterQueryParams } = useContext(UserRewardsContext);

  const filteredCurrencyIds = useMemo(
    () => (filterQueryParams?.currencies ? filterQueryParams.currencies.split(",") : []),
    [filterQueryParams]
  );

  const { prettyAmount, currency, usdEquivalent }: TMoney = useMemo(() => {
    const usd = {
      amount: amount?.totalUsdEquivalent ?? 0,
      prettyAmount: amount?.totalUsdEquivalent ?? 0,
      currency: Money.USD,
    };

    // We only want to show the crypto amount if there is one currency selected, otherwise we show the total USD amount
    if (filteredCurrencyIds.length === 1) {
      return amount?.totalPerCurrency?.find(c => c.currency.id === filteredCurrencyIds[0]) ?? usd;
    }

    return usd;
  }, [amount, filteredCurrencyIds]);

  if (!amount) return null;

  const isCrypto = !Money.isFiat(currency);

  return (
    <>
      {isCrypto ? (
        <Chip className="mr-1 h-5 w-5">{<CurrencyIcons className="h-4 w-4" currency={currency} />}</Chip>
      ) : null}

      {
        Money.format({
          amount: prettyAmount || usdEquivalent,
          currency,
          options: {
            currencyClassName: "text-title-s",
          },
        }).html
      }

      {isCrypto && usdEquivalent ? (
        <div
          className="ml-1 mt-2 font-walsheim text-sm text-spaceBlue-50"
          {...withTooltip(T("project.details.remainingBudget.usdInfo"))}
        >
          {
            Money.format({
              amount: usdEquivalent,
              currency: Money.USD,
              options: { prefixAmountWithTilde: true },
            }).string
          }
        </div>
      ) : null}
    </>
  );
}
