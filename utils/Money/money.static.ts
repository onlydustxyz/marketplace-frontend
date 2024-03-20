import { Money } from "utils/Money/Money";

export const MoneyStatic: { [key: string]: Money.Currency } = {
  APT: {
    id: "",
    code: "APT",
    decimals: 8,
    logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/fb39d6f11124d3c6ac6d9e28e2d0d0b1.png",
    name: "Aptos",
  },
  ETH: {
    code: "ETH",
    id: "",
    decimals: 18,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    name: "Ethereum",
  },
  EUR: {
    code: "EUR",
    id: "",
    decimals: 2,
    logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/6c8c210d95fccd6ce25b2b44cd70a012.png",
    name: "Euro",
  },
  LORDS: {
    code: "LORDS",
    id: "",
    decimals: 18,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/17445.png",
    name: "Lords",
  },
  OP: {
    code: "OP",
    id: "",
    decimals: 18,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png",
    name: "Optimism",
  },
  STRK: {
    code: "STRK",
    id: "",
    decimals: 18,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/22691.png",
    name: "StarkNet Token",
  },
  USD: {
    code: "USD",
    id: "",
    decimals: 2,
    logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
    name: "US Dollar",
  },
  USDC: {
    code: "USDC",
    id: "",
    decimals: 6,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    name: "USD Coin",
  },
};

export const MoneyStaticUSD: Money.Currency = {
  id: "",
  code: "USD",
  name: "US Dollar",
  logoUrl: "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/f171e9690f6658e106a049cd62843ec4.png",
  decimals: 0,
};
