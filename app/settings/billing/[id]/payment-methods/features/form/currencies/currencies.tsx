import { useMemo } from "react";
import { Money } from "utils/Money/Money";

import { TCurrencies } from "app/settings/billing/[id]/payment-methods/features/form/currencies/currencies.types";

import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";

export function Currencies({ currencies }: TCurrencies.Props) {
  const order = Money.Static.CurrencyOrder;

  const orderedCurrencies = useMemo(
    () =>
      [...currencies].sort((a: Money.Static.Currency, b: Money.Static.Currency) => order.indexOf(a) - order.indexOf(b)),
    [currencies]
  );

  return (
    <Flex alignItems="center" className="gap-2">
      <p>
        <Translate token="v2.pages.settings.billing.payout.wallets.description" />
      </p>

      {orderedCurrencies.map(currency => (
        <Flex key={currency} className="gap-1" alignItems="center">
          <CurrencyIcons currency={Money.fromSchema({ code: currency })} className="h-4 w-4" />

          <p className="text-gray-50">{Money.fromSchema({ code: currency }).name}</p>
        </Flex>
      ))}
    </Flex>
  );
}
