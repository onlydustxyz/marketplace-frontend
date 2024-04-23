import { Money } from "utils/Money/Money";

import { DetailedTotalMoney } from "src/types";

type Amount = {
  budget?: DetailedTotalMoney;
};

export function Amount({ budget }: Amount) {
  if (!budget) return null;

  return Money.format({
    amount: budget.totalUsdEquivalent,
    currency: Money.USD,
    options: {
      currencyClassName: "text-title-s",
      prefixAmountWithTilde: true,
    },
  }).html;
}
