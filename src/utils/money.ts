import { components } from "src/__generated/api";
import { Currency } from "src/types";

export type BudgetCurrencyType = components["schemas"]["BudgetResponse"]["currency"];
export type EarningCurrencyType = components["schemas"]["MyRewardAmountResponse"]["currency"];

type Params = {
  amount: number;
  currency?: BudgetCurrencyType;
  notation?: "standard" | "scientific" | "engineering" | "compact";
  showCurrency?: boolean;
};

export const formatMoneyAmount = ({
  amount,
  currency = Currency.USD,
  notation = "standard",
  showCurrency = true,
}: Params) => {
  return `${Intl.NumberFormat("en-US", {
    notation,
    // maximumFractionDigits: maximumFractionDigits({ amount, notation }), // keep this but we need to disable because when don't want to round for crypto
    maximumFractionDigits: currency === Currency.USD ? maximumFractionDigits({ amount, notation }) : 6,
  })
    .format(amount)
    .replace("K", "k")}${showCurrency ? ` ${currency}` : ""}`;
};

const maximumFractionDigits = ({ amount, notation }: Params) => {
  switch (notation) {
    case "compact": {
      return Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
        notation,
      })
        .formatToParts(amount)
        .find(p => p.type === "fraction")?.value
        ? 1
        : 0;
    }

    default:
      return 0;
  }
};
