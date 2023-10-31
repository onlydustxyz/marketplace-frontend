import { components } from "src/__generated/api";
import { Currency } from "src/types";

export type BudgetCurrencyType = components["schemas"]["BudgetResponse"]["currency"];
export type EarningCurrencyType = components["schemas"]["MyRewardAmountResponse"]["currency"];

type Params = {
  amount: number;
  currency?: BudgetCurrencyType;
  notation?: "standard" | "scientific" | "engineering" | "compact";
  showCurrency?: boolean;
  addRound?: boolean;
};

export const formatMoneyAmount = ({
  amount,
  currency = Currency.USD,
  notation = "standard",
  showCurrency = true,
  addRound = true,
}: Params) => {
  switch (currency) {
    case Currency.USD:
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: addRound ? maximumFractionDigits({ amount, notation }) : undefined,
        notation,
      })
        .format(amount)
        .replace("K", "k");
    default:
      return `${Intl.NumberFormat("en-US", {
        maximumFractionDigits: addRound ? maximumFractionDigits({ amount, notation, addRound }) : undefined,
        notation,
      })
        .format(amount)
        .replace("K", "k")}${showCurrency ? ` ${currency}` : ""}`;
  }
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
