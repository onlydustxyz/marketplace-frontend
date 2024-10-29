import apt from "public/images/currencyStatic/apt.png";
import eth from "public/images/currencyStatic/eth.png";
import eur from "public/images/currencyStatic/eur.png";
import lords from "public/images/currencyStatic/lords.png";
import near from "public/images/currencyStatic/near.png";
import op from "public/images/currencyStatic/op.png";
import strk from "public/images/currencyStatic/strk.png";
import usd from "public/images/currencyStatic/usd.png";
import usdc from "public/images/currencyStatic/usdc.png";
import wld from "public/images/currencyStatic/wld.png";
import xlm from "public/images/currencyStatic/xlm.png";
import { Money } from "utils/Money/Money";

export const MoneyStatic: { [key: string]: Money.Currency } = {
  APT: {
    id: "",
    code: "APT",
    decimals: 8,
    logoUrl: apt.src,
    name: "Aptos",
  },
  ETH: {
    code: "ETH",
    id: "",
    decimals: 18,
    logoUrl: eth.src,
    name: "Ethereum",
  },
  EUR: {
    code: "EUR",
    id: "",
    decimals: 2,
    logoUrl: eur.src,
    name: "Euro",
  },
  LORDS: {
    code: "LORDS",
    id: "",
    decimals: 18,
    logoUrl: lords.src,
    name: "Lords",
  },
  OP: {
    code: "OP",
    id: "",
    decimals: 18,
    logoUrl: op.src,
    name: "Optimism",
  },
  STRK: {
    code: "STRK",
    id: "",
    decimals: 18,
    logoUrl: strk.src,
    name: "Starknet",
  },
  USD: {
    code: "USD",
    id: "",
    decimals: 2,
    logoUrl: usd.src,
    name: "US Dollar",
  },
  USDC: {
    code: "USDC",
    id: "",
    decimals: 6,
    logoUrl: usdc.src,
    name: "USD Coin",
  },
  WLD: {
    code: "WLD",
    id: "",
    decimals: 18,
    logoUrl: wld.src,
    name: "Worldcoin",
  },
  XLM: {
    code: "XLM",
    id: "",
    decimals: 7,
    logoUrl: xlm.src,
    name: "Stellar",
  },
  NEAR: {
    code: "NEAR",
    id: "",
    decimals: 24,
    logoUrl: near.src,
    name: "Near",
  },
};

export const MoneyStaticUSD: Money.Currency = {
  id: "",
  code: "USD",
  name: "US Dollar",
  logoUrl: usd.src,
  decimals: 0,
};
