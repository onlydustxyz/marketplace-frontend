import { FC } from "react";
import { Money } from "utils/Money/Money";

import { cn } from "src/utils/cn";

export interface CurrencyIconsProps {
  currency?: Money.Currency;
  className?: string;
}

export const CurrencyIcons: FC<CurrencyIconsProps> = ({ currency, className }) => {
  if (!currency?.logoUrl) {
    return null;
  }

  return (
    <img
      src={currency?.logoUrl}
      alt={currency.name}
      className={cn("h-8 w-8 overflow-hidden rounded-full", className ? className : null)}
      loading="lazy"
    />
  );
};
