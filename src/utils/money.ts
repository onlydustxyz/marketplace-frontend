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
        maximumFractionDigits: maximumFractionDigits({ amount, notation }),
        notation,
      })
        .format(amount)
        .replace("K", "k");
    case Currency.USDC:
    case Currency.ETH:
      return `${currency} ${Intl.NumberFormat("en-US", {
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
