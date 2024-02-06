import { Controller, useFormContext } from "react-hook-form";

import { useIntl } from "src/hooks/useIntl";

import { Card } from "components/ds/card/card";
import { Input } from "components/ds/form/input/input";
import { Flex } from "components/layout/flex/flex";

import { Currencies } from "./currencies/currencies";
import { FormWalletSection } from "./section/section";

export function PayoutForm() {
  const { T } = useIntl();

  const { control } = useFormContext();

  return (
    <Card background="base">
      <FormWalletSection>
        <Controller
          name="ethWallet"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              label={T("v2.pages.settings.payout.wallets.ethereum.label")}
              placeholder={T("v2.pages.settings.payout.wallets.ethereum.placeholder")}
              description={<Currencies currencies={["USDC", "ETH", "LORDS"]} />}
            />
          )}
        />
      </FormWalletSection>

      <FormWalletSection>
        <Controller
          name="starknetAddress"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              label={T("v2.pages.settings.payout.wallets.starknet.label")}
              placeholder={T("v2.pages.settings.payout.wallets.starknet.placeholder")}
              description={<Currencies currencies={["STRK"]} />}
            />
          )}
        />
      </FormWalletSection>

      <FormWalletSection>
        <Controller
          name="optimismAddress"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              label={T("v2.pages.settings.payout.wallets.optimism.label")}
              placeholder={T("v2.pages.settings.payout.wallets.optimism.placeholder")}
              description={<Currencies currencies={["OP"]} />}
            />
          )}
        />
      </FormWalletSection>

      <FormWalletSection>
        <Controller
          name="aptosAddress"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              label={T("v2.pages.settings.payout.wallets.aptos.label")}
              placeholder={T("v2.pages.settings.payout.wallets.aptos.placeholder")}
              description={<Currencies currencies={["APT"]} />}
            />
          )}
        />
      </FormWalletSection>

      <Flex className="flex-col gap-4 md:flex-row">
        <Controller
          name="sepaAccount.iban"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              label={T("v2.pages.settings.payout.wallets.sepa.iban.label")}
              placeholder={T("v2.pages.settings.payout.wallets.sepa.iban.placeholder")}
              description={<Currencies currencies={["USD"]} />}
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
              label={T("v2.pages.settings.payout.wallets.sepa.bic.label")}
              placeholder={T("v2.pages.settings.payout.wallets.sepa.bic.placeholder")}
            />
          )}
        />
      </Flex>
    </Card>
  );
}
