import { FC } from "react";

import Aptos from "src/assets/icons/Aptos";
import { DollarCurrency } from "src/assets/icons/DollarCurrency";
import Ethereum from "src/assets/icons/Ethereum";
import Lords from "src/assets/icons/Lords";
import Optimism from "src/assets/icons/Optimism";
import Starknet from "src/assets/icons/Starknet";
import Usdc from "src/assets/icons/Usdc";
import { Currency } from "src/types";
import { BudgetCurrencyType } from "src/utils/money";

export interface CurrencyIconsProps {
  currency?: BudgetCurrencyType;
  className?: string;
}

export const CurrencyIcons: FC<CurrencyIconsProps> = ({ currency, className }) => {
  switch (currency) {
    case Currency.USD:
      return <DollarCurrency className={className} />;
    case Currency.ETH:
      return <Ethereum className={className} />;
    case Currency.STRK:
      return <Starknet className={className} />;
    case Currency.LORDS:
      return <Lords className={className} />;
    case Currency.USDC:
      return <Usdc className={className} />;
    case Currency.OP:
      return <Optimism className={className} />;
    case Currency.APT:
      return <Aptos className={className} />;
    default:
      return <div className={className} />;
  }
};
