import { useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import { APTOS_WALLET, ETH_WALLET_OR_ENS_ADDRESS, OPTIMISM_WALLET, STARKNET_WALLET } from "src/utils/regex";
import { RequiredFieldsType } from "src/App/Stacks/PayoutInfoSidePanel/usePayoutInfoValidation";
import CurrencyField from "./CurrencyField.tsx";
import { Currency } from "src/types.ts";

export function OtherCryptoFields({ requiredFields }: { requiredFields: RequiredFieldsType }) {
  const { T } = useIntl();
  const { register } = useFormContext();

  const { missingAptosWallet, missingEthWallet, missingOptimismWallet, missingStarknetWallet } = requiredFields || {};

  return (
    <>
      <CurrencyField currencies={[Currency.USDC, Currency.ETH, Currency.LORDS]}>
        <Input
          withMargin={false}
          label={T("profile.form.ethIdentity")}
          placeholder={T("profile.form.ethIdentityPlaceholder")}
          {...register("ethWallet", {
            pattern: {
              value: ETH_WALLET_OR_ENS_ADDRESS,
              message: T("profile.form.invalidEthWallet"),
            },
          })}
          showRequiredError={missingEthWallet}
        />
      </CurrencyField>
      <CurrencyField currencies={[Currency.STRK]}>
        <Input
          label={T("profile.form.starkIdentity")}
          withMargin={false}
          placeholder={T("profile.form.starkIdentityPlaceholder")}
          {...register("starknetWallet", {
            pattern: {
              value: STARKNET_WALLET,
              message: T("profile.form.invalidStarknetWallet"),
            },
          })}
          showRequiredError={missingStarknetWallet}
        />
      </CurrencyField>
      <CurrencyField currencies={[Currency.OP]}>
        <Input
          label={T("profile.form.optimismIdentity")}
          withMargin={false}
          placeholder={T("profile.form.optimismIdentityPlaceholder")}
          {...register("optimismWallet", {
            pattern: {
              value: OPTIMISM_WALLET,
              message: T("profile.form.invalidOptimismWallet"),
            },
          })}
          showRequiredError={missingOptimismWallet}
        />
      </CurrencyField>
      <CurrencyField currencies={[Currency.APT]}>
        <Input
          label={T("profile.form.aptosIdentity")}
          withMargin={false}
          placeholder={T("profile.form.aptosIdentityPlaceholder")}
          {...register("aptosWallet", {
            pattern: {
              value: APTOS_WALLET,
              message: T("profile.form.invalidAptosWallet"),
            },
          })}
          showRequiredError={missingAptosWallet}
        />
      </CurrencyField>
    </>
  );
}
