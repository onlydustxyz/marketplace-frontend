import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TCurrencies } from "./currencies.types";

export function Currencies({ currencies }: TCurrencies.Props) {
  return (
    <Flex alignItems="center" className="gap-2">
      <Typography
        variant="body-xs"
        className="text-greyscale-200"
        translate={{
          token: "v2.pages.settings.payout.wallets.description",
        }}
      />

      {currencies.map(currency => (
        <Flex key={currency} className="gap-1" alignItems="center">
          <CurrencyIcons currency={currency} className="h-4 w-4" />
          <Typography
            variant="body-xs"
            translate={{
              token: `currencies.currency.${currency}`,
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
}
