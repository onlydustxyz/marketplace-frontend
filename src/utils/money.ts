import { components } from "src/__generated/api";
import { Currency } from "src/types";

export type BugetCurrencyType = components["schemas"]["BudgetResponse"]["currency"];

type Params = {
  amount: number;
  currency?: BugetCurrencyType;
  notation?: "standard" | "scientific" | "engineering" | "compact";
};

export const formatMoneyAmount = ({ amount, currency = Currency.USD, notation = "standard" }: Params) => {
  switch (currency) {
    case Currency.USD:
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: maximumFractionDigits({ amount, notation }),
        notation,
      })
        .format(amount)
        .replace("K", "k");
    default:
      return `${Intl.NumberFormat("en-US", {
        maximumFractionDigits: maximumFractionDigits({ amount, notation }),
        notation,
      })
        .format(amount)
        .replace("K", "k")}`;
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
