import React, { PropsWithChildren } from "react";
import { Currency } from "src/types.ts";
import { Flex } from "components/layout/flex/flex.tsx";
import { Chip } from "src/components/Chip/Chip.tsx";
import { Typography } from "components/layout/typography/typography.tsx";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon.tsx";

interface CurrencyFieldProps extends PropsWithChildren {
  currencies: Currency[];
}
function CurrencyField({ currencies, children }: CurrencyFieldProps) {
  return (
    <Flex direction="col" className="w-full gap-2">
      {children}
      <Flex className="w-full gap-2" alignItems="center">
        <Typography
          variant={"body-xs"}
          translate={{ token: "profile.form.walletUsedFor" }}
          className="text-greyscale-200"
        />
        {currencies.map(currency => (
          <Flex key={currency} className="gap-1" alignItems="center">
            <Chip solid>
              <CurrencyIcons currency={currency} className="h-4 w-4" />
            </Chip>
            <Typography variant={"body-xs"}>{currency}</Typography>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default CurrencyField;
