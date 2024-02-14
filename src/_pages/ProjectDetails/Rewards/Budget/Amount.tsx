import { Currency, Money } from "src/types";
import { formatMoneyAmount } from "src/utils/money";

type Amount = {
  budget?: Money;
};

export function Amount({ budget }: Amount) {
  if (!budget) return null;

  if (!budget.usdEquivalent && !!budget.amount) {
    return (
      <>
        {`${formatMoneyAmount({
          amount: budget.amount,
          currency: budget.currency,
          showCurrency: false,
        })}`}
        <span className="text-title-s">&nbsp;{budget.currency}</span>
      </>
    );
  }

  if (budget.currency === Currency.STRK) {
    return <>N/A</>;
  }

  return (
    <>
      {`~${formatMoneyAmount({
        amount: budget.usdEquivalent,
        currency: Currency.USD,
        showCurrency: false,
      })}`}
      <span className="text-title-s">&nbsp;{Currency.USD}</span>
    </>
  );
}
