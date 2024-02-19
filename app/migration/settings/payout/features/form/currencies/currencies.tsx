import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";

import { TCurrencies } from "./currencies.types";

export function Currencies({ currencies }: TCurrencies.Props) {
  return (
    <Flex alignItems="center" className="gap-2">
      <p>
        <Translate token="v2.pages.settings.payout.wallets.description" />
      </p>

      {currencies.map(currency => (
        <Flex key={currency} className="gap-1" alignItems="center">
          <CurrencyIcons currency={currency} className="h-4 w-4" />

          <p className="text-gray-50">
            <Translate token={`currencies.currency.${currency}`} />
          </p>
        </Flex>
      ))}
    </Flex>
  );
}