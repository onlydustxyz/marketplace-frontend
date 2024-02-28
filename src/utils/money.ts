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

/**
 * Formats a number with thousands separators, a specified number of decimal places, and appends a currency symbol.
 * Returns a default value if the amount is undefined.
 * @param amount The number to format, can be undefined.
 * @param locale The locale string to use for formatting. Defaults to 'en-US'.
 * @param fixedDecimals The number of decimal places to fix the amount to. Defaults to 2.
 * @param currency The currency symbol or code to append. Defaults to an empty string for no currency.
 * @returns The formatted number as a string with specified decimal places and currency, or a default value.
 */
interface FormatAmountParams {
  amount?: number;
  locale?: string;
  fixedDecimals?: number;
  currency?: BudgetCurrencyType | undefined;
}
export function formatAmount({ amount, locale = "en-US", fixedDecimals = 2, currency }: FormatAmountParams): string {
  if (amount === null) {
    return "N/A";
  }

  const fixedAmount = Number(amount.toFixed(fixedDecimals));
  const formattedNumber = new Intl.NumberFormat(locale, {
    maximumFractionDigits: fixedDecimals,
  }).format(fixedAmount);

  return currency ? `${formattedNumber} ${currency}` : formattedNumber;
}
