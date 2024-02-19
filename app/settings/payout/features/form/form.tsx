import IBANParser from "iban";
import { Controller, useFormContext } from "react-hook-form";

import { Currencies } from "app/settings/payout/features/form/currencies/currencies";

import MeApi from "src/api/me";
import { useIntl } from "src/hooks/useIntl";
import { Currency } from "src/types";

import { Card } from "components/ds/card/card";
import { Input } from "components/ds/form/input/input";
import { Flex } from "components/layout/flex/flex";

export function PayoutForm() {
  const { T } = useIntl();

  const { control } = useFormContext();
  const { data } = MeApi.queries.useGetMyPayoutSettings({});
  return (
    <Card background="base">
      <Flex
        direction="col"
        className="gap-4 divide-y divide-solid divide-greyscale-50/8 [&>div:first-child]:pt-0 [&>div]:pt-4"
      >
        <Controller
          name="ethWallet"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              isInvalid={!!fieldState.error || data?.missingEthWallet}
              label={T("v2.pages.settings.payout.wallets.ethereum.label")}
              placeholder={T("v2.pages.settings.payout.wallets.ethereum.placeholder")}
              description={<Currencies currencies={[Currency.USDC, Currency.ETH, Currency.LORDS]} />}
            />
          )}
        />

        <Controller
          name="starknetAddress"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              isInvalid={!!fieldState.error || data?.missingStarknetWallet}
              label={T("v2.pages.settings.payout.wallets.starknet.label")}
              placeholder={T("v2.pages.settings.payout.wallets.starknet.placeholder")}
              description={<Currencies currencies={[Currency.STRK]} />}
            />
          )}
        />

        <Controller
          name="optimismAddress"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              isInvalid={!!fieldState.error || data?.missingOptimismWallet}
              label={T("v2.pages.settings.payout.wallets.optimism.label")}
              placeholder={T("v2.pages.settings.payout.wallets.optimism.placeholder")}
              description={<Currencies currencies={[Currency.OP]} />}
            />
          )}
        />

        <Controller
          name="aptosAddress"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              isInvalid={!!fieldState.error || data?.missingAptosWallet}
              label={T("v2.pages.settings.payout.wallets.aptos.label")}
              placeholder={T("v2.pages.settings.payout.wallets.aptos.placeholder")}
              description={<Currencies currencies={[Currency.APT]} />}
            />
          )}
        />

        <Flex className="flex-col gap-4 md:flex-row">
          <Controller
            name="sepaAccount.iban"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error || data?.missingSepaAccount}
                value={field.value && IBANParser.printFormat(field.value)}
                label={T("v2.pages.settings.payout.wallets.sepa.iban.label")}
                placeholder={T("v2.pages.settings.payout.wallets.sepa.iban.placeholder")}
                description={<Currencies currencies={[Currency.USD]} />}
              />
            )}
          />

          <Controller
            name="sepaAccount.bic"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error || data?.missingSepaAccount}
                label={T("v2.pages.settings.payout.wallets.sepa.bic.label")}
                placeholder={T("v2.pages.settings.payout.wallets.sepa.bic.placeholder")}
              />
            )}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
