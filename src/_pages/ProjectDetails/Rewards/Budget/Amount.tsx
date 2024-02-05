import { Currency, Money } from "src/types";
import { formatMoneyAmount } from "src/utils/money";

type Amount = {
  budget?: Money;
};

export function Amount({ budget }: Amount) {
  if (!budget) return null;

  if (budget.currency === Currency.STRK || budget.usdEquivalent === null) {
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
