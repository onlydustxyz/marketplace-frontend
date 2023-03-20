import { Currency } from "src/types";

type Params = {
  amount: number;
  currency?: Currency;
  notation?: "standard" | "scientific" | "engineering" | "compact";
};

export const formatMoneyAmount = ({ amount, currency = Currency.USD, notation = "standard" }: Params) => {
  switch (currency) {
    case Currency.USD:
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: notation === "compact" && amount >= 1000 ? 1 : 0,
        notation,
      }).format(amount);
    case Currency.USDC:
    case Currency.ETH:
      return `${currency} ${Intl.NumberFormat("en-US", {
        maximumFractionDigits: notation === "compact" && amount >= 1000 ? 1 : 0,
        notation,
      }).format(amount)}`;
  }
};
