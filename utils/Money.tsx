import { components } from "src/__generated/api";

export namespace Money {
  export type Currency = components["schemas"]["ShortCurrencyResponse"];
  export const USD: Currency = {
    id: "c2b27e1c-e070-42b2-82b3-7dd21f5193c6",
    code: "USD",
    name: "US Dollar",
    logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
    decimals: 0,
  };

  export const CodeMapping = {
    USD: ["USD"],
  };

  export interface IFormat {
    amount?: number;
    currency?: Currency;
    options?: {
      showCurrency?: boolean;
      locale?: string;
    };
  }

  export function format({ amount, currency, options = { showCurrency: true, locale: "en-US" } }: IFormat) {
    if (amount === null || amount === undefined || !currency) {
      return {
        string: "N/A",
        html: <span>N/A</span>,
      };
    }

    const formattedNumber = new Intl.NumberFormat(options.locale, {
      maximumFractionDigits: currency.decimals,
    }).format(amount);

    const string = options.showCurrency ? `${formattedNumber} ${currency.code}` : formattedNumber;
    const html = (
      <span>
        {formattedNumber} {options.showCurrency ? <span>{currency.code}</span> : null}
      </span>
    );

    return {
      string,
      html,
    };
  }

  export function isUsd(currency?: Currency) {
    if (!currency) return false;

    return Money.CodeMapping.USD.includes(currency.code);
  }
}
