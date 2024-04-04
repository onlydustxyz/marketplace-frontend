import { Money } from "utils/Money/Money";

import { Money as TMoney } from "src/types";

type Amount = {
  budget?: TMoney;
};

export function Amount({ budget }: Amount) {
  if (!budget) return null;

  if (!budget.usdEquivalent && !!budget.amount) {
    return Money.format({
      amount: budget.amount,
      currency: budget.currency,
      options: {
        currencyClassName: "text-title-s",
      },
    }).html;
  }

  return Money.format({
    amount: budget.usdEquivalent,
    currency: Money.USD,
    options: {
      currencyClassName: "text-title-s",
      prefixAmountWithTilde: true,
    },
  }).html;
}
