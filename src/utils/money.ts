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
  if (amount === null || amount === undefined) {
    return "N/A";
  }

  const fixedAmount = Number(amount?.toFixed(fixedDecimals));
  const formattedNumber = new Intl.NumberFormat(locale, {
    maximumFractionDigits: fixedDecimals,
  }).format(fixedAmount);

  return currency ? `${formattedNumber} ${currency}` : formattedNumber;
}
