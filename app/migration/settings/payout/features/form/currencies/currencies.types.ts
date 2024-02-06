export namespace TCurrencies {
  type Currency = "USD" | "ETH" | "STRK" | "LORDS" | "APT" | "OP" | "USDC";

  export interface Props {
    currencies: Currency[];
  }
}
