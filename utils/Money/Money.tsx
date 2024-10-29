import { MoneyStatic, MoneyStaticUSD } from "utils/Money/money.static";

import { components } from "src/__generated/api";

interface IMoneyClassFormat {
  amount?: number | null;
  currency?: Money.Currency;
  options?: {
    showCurrency?: boolean;
    locale?: string;
    currencyClassName?: string;
    prefixAmountWithTilde?: boolean;
    notation?: "standard" | "scientific" | "engineering" | "compact";
  };
}

interface IMoneyClass {
  format: (props: IMoneyClassFormat) => { string: string; html: JSX.Element };
  isFiat: (currency?: Money.Currency) => boolean;
  fromSchema: (props: Partial<Money.Currency>) => Money.Currency;
}

class MoneyClass implements IMoneyClass {
  private CodeMapping = {
    FIAT: ["USD", "EUR"],
  };
  private withCurrency(str: string, code: string, showCurrency: boolean) {
    if (showCurrency) {
      return `${str} ${code}`;
    }

    return str;
  }

  private withTilde(str: string, prefixAmountWithTilde: boolean) {
    if (prefixAmountWithTilde) {
      return `~${str}`;
    }

    return `${str}`;
  }

  private getAmount(amount: number, currency: Money.Currency, options: IMoneyClassFormat["options"]) {
    const { locale = "en-US", notation } = options || {};

    /** need this to have fixed decimal places for compact notation */
    const maximumFractionDigits = notation === "compact" ? 1 : Math.min(currency?.decimals, 20);

    return new Intl.NumberFormat(locale, {
      maximumFractionDigits,
      notation,
    })
      .format(amount)
      .toLowerCase();
  }

  private toHtml({
    amount,
    currency,
    options,
  }: {
    amount: string;
    currency: Money.Currency;
    options: IMoneyClassFormat["options"];
  }) {
    const { showCurrency = true, currencyClassName, prefixAmountWithTilde = false } = options || {};
    return (
      <span>
        {this.withTilde(amount, prefixAmountWithTilde)}
        {showCurrency ? <span className={currencyClassName}>&nbsp;{currency.code}</span> : null}
      </span>
    );
  }

  private toString({
    amount,
    currency,
    options,
  }: {
    amount: string;
    currency: Money.Currency;
    options: IMoneyClassFormat["options"];
  }) {
    const { showCurrency = true, prefixAmountWithTilde = false } = options || {};
    return this.withCurrency(this.withTilde(amount, prefixAmountWithTilde), currency.code, showCurrency);
  }

  public format({ amount, currency, options }: IMoneyClassFormat) {
    if (amount === null || amount === undefined || !currency) {
      return {
        string: "N/A",
        html: <span>N/A</span>,
      };
    }

    const formattedNumber = this.getAmount(amount, currency, options);

    return {
      string: this.toString({ amount: formattedNumber, currency, options }),
      html: this.toHtml({ amount: formattedNumber, currency, options }),
    };
  }

  public fromSchema(props: Partial<Money.Currency>): Money.Currency {
    const staticCurrencyProps = MoneyStatic[props.code || ""];
    return {
      id: props.id || "",
      code: props.code || staticCurrencyProps?.code || "",
      name: props.name || staticCurrencyProps?.name || "",
      logoUrl: props.logoUrl || staticCurrencyProps?.logoUrl || "",
      decimals: props.decimals || staticCurrencyProps?.decimals || 0,
    };
  }

  public isFiat(currency?: Money.Currency) {
    if (!currency) return false;

    return this.CodeMapping.FIAT.includes(currency.code);
  }
}

export namespace Money {
  export namespace Static {
    export enum Currency {
      USD = "USD",
      ETH = "ETH",
      STRK = "STRK",
      LORDS = "LORDS",
      APT = "APT",
      OP = "OP",
      USDC = "USDC",
      WLD = "WLD",
      XLM = "XLM",
      NEAR = "NEAR",
    }

    export const CurrencyOrder = ["USDC", "USD", "ETH", "STRK", "OP", "APT", "LORDS", "WLD", "XLM", "NEAR"];
  }

  export type Currency = components["schemas"]["ShortCurrencyResponse"];
  export const USD = MoneyStaticUSD;

  export function format({ amount, currency, options }: IMoneyClassFormat) {
    const money = new MoneyClass();
    return money.format({ amount, currency, options });
  }

  export function fromSchema(props: Partial<Money.Currency>) {
    const money = new MoneyClass();
    return money.fromSchema(props);
  }

  export function isFiat(currency?: Money.Currency) {
    const money = new MoneyClass();
    return money.isFiat(currency);
  }
}
