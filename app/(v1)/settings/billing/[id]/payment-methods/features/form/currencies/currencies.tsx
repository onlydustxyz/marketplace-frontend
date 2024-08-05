import { Money } from "utils/Money/Money";

import { TCurrencies } from "app/(v1)/settings/billing/[id]/payment-methods/features/form/currencies/currencies.types";

import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";

export function Currencies({ currencies }: TCurrencies.Props) {
  return (
    <Flex alignItems="center" className="gap-2">
      <p>
        <Translate token="v2.pages.settings.billing.payout.wallets.description" />
      </p>

      {currencies.map(currency => (
        <Flex key={currency} className="gap-1" alignItems="center">
          <CurrencyIcons currency={Money.fromSchema({ code: currency })} className="h-4 w-4" />

          <p className="text-gray-50">{Money.fromSchema({ code: currency }).name}</p>
        </Flex>
      ))}
    </Flex>
  );
}
