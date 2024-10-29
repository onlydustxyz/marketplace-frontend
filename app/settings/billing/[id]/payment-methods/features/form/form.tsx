import IBANParser from "iban";
import { useParams } from "next/navigation";
import { Controller, useFormContext } from "react-hook-form";
import { Money } from "utils/Money/Money";

import BillingProfilesApi from "src/api/BillingProfiles";

import { Input } from "components/ds/form/input/input";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";

import { Currencies } from "./currencies/currencies";

export function PayoutForm() {
  const { T } = useIntl();

  const { control } = useFormContext();
  const { id } = useParams<{ id: string }>();
  const { data } = BillingProfilesApi.queries.useGetPayoutInfo({
    params: {
      id,
    },
  });

  return (
    <Flex direction="col" className="gap-4 divide-y divide-greyscale-50/8 [&>div:first-child]:pt-0 [&>div]:pt-4">
      <Controller
        name="ethWallet"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            {...fieldState}
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
            isInvalidFromBackend={data?.missingEthWallet}
            label={T("v2.pages.settings.billing.payout.wallets.ethereum.label")}
            placeholder={T("v2.pages.settings.billing.payout.wallets.ethereum.placeholder")}
            description={
              <Currencies
                currencies={[
                  Money.Static.Currency.ETH,
                  Money.Static.Currency.USDC,
                  Money.Static.Currency.LORDS,
                  Money.Static.Currency.STRK,
                ]}
              />
            }
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
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
            isInvalidFromBackend={data?.missingStarknetWallet}
            label={T("v2.pages.settings.billing.payout.wallets.starknet.label")}
            placeholder={T("v2.pages.settings.billing.payout.wallets.starknet.placeholder")}
            description={
              <Currencies
                currencies={[Money.Static.Currency.ETH, Money.Static.Currency.USDC, Money.Static.Currency.STRK]}
              />
            }
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
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
            isInvalidFromBackend={data?.missingOptimismWallet}
            label={T("v2.pages.settings.billing.payout.wallets.optimism.label")}
            placeholder={T("v2.pages.settings.billing.payout.wallets.optimism.placeholder")}
            description={
              <Currencies
                currencies={[Money.Static.Currency.WLD, Money.Static.Currency.USDC, Money.Static.Currency.OP]}
              />
            }
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
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
            isInvalidFromBackend={data?.missingAptosWallet}
            label={T("v2.pages.settings.billing.payout.wallets.aptos.label")}
            placeholder={T("v2.pages.settings.billing.payout.wallets.aptos.placeholder")}
            description={<Currencies currencies={[Money.Static.Currency.APT]} />}
          />
        )}
      />

      <Controller
        name="stellarAccountId"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            {...fieldState}
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
            isInvalidFromBackend={data?.missingStellarWallet}
            label={T("v2.pages.settings.billing.payout.wallets.stellar.label")}
            placeholder={T("v2.pages.settings.billing.payout.wallets.stellar.placeholder")}
            description={<Currencies currencies={[Money.Static.Currency.XLM, Money.Static.Currency.USDC]} />}
          />
        )}
      />

      <Controller
        name="nearAccountId"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            {...fieldState}
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
            isInvalidFromBackend={data?.missingNearWallet}
            label={T("v2.pages.settings.billing.payout.wallets.near.label")}
            placeholder={T("v2.pages.settings.billing.payout.wallets.near.placeholder")}
            description={<Currencies currencies={[Money.Static.Currency.NEAR]} />}
          />
        )}
      />

      <Flex className="flex-col gap-4 md:flex-row">
        <Controller
          name="bankAccount.number"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
              isInvalidFromBackend={data?.missingBankAccount}
              value={field.value && IBANParser.printFormat(field.value)}
              label={T("v2.pages.settings.billing.payout.wallets.sepa.iban.label")}
              placeholder={T("v2.pages.settings.billing.payout.wallets.sepa.iban.placeholder")}
              description={<Currencies currencies={[Money.Static.Currency.USD]} />}
            />
          )}
        />

        <Controller
          name="bankAccount.bic"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
              isInvalidFromBackend={data?.missingBankAccount}
              label={T("v2.pages.settings.billing.payout.wallets.sepa.bic.label")}
              placeholder={T("v2.pages.settings.billing.payout.wallets.sepa.bic.placeholder")}
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
