import { Currency } from "src/types";

export const formatMoneyAmount = (amount: number, currency: Currency = Currency.USD) => {
  switch (currency) {
    case Currency.USD:
      return Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
    case Currency.USDC:
    case Currency.ETH:
      return `${currency} ${Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)}`;
  }
};
