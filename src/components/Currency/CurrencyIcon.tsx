import { FC } from "react";
import { Currency } from "src/types";
import Ethereum from "src/assets/icons/Ethereum";
import Optimism from "src/assets/icons/Optimism";
import Starknet from "src/assets/icons/Starknet";
import Aptos from "src/assets/icons/Aptos";
import { DollarCurrency } from "src/assets/icons/DollarCurrency";

export interface CurrencyIconsProps {
  currency?: Currency;
  className?: string;
}

export const CurrencyIcons: FC<CurrencyIconsProps> = ({ currency, className }) => {
  switch (currency) {
    case Currency.USD:
      return <DollarCurrency className={className} />;
    case Currency.ETH:
      return <Ethereum className={className} />;
    case Currency.STARK:
      return <Starknet className={className} />;
    case Currency.OP:
      return <Optimism className={className} />;
    case Currency.APT:
      return <Aptos className={className} />;
    default:
      return <div className={className} />;
  }
};
