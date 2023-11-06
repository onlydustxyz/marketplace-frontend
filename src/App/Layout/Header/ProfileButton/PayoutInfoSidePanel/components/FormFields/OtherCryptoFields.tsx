import { useFormContext } from "react-hook-form";
import { Chip } from "src/components/Chip/Chip";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import OptimismIcon from "src/assets/icons/Optimism";
import StarknetIcon from "src/assets/icons/Starknet";
import { APTOS_WALLET, ETH_WALLET_OR_ENS_ADDRESS, OPTIMISM_WALLET, STARKNET_WALLET } from "src/utils/regex";
import Aptos from "src/assets/icons/Aptos";
import EthereumIcon from "src/assets/icons/Ethereum";
import { RequiredFieldsType } from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel/usePayoutInfoValidation";
import { ProfileType } from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel/types";
import { PreferredMethod } from "src/types";

export function OtherCryptoFields({ requiredFields }: { requiredFields: RequiredFieldsType }) {
  const { T } = useIntl();
  const { register } = useFormContext();

  const { watch } = useFormContext();
  const [usdPreferredMethod, profileType] = watch(["usdPreferredMethod", "profileType"]);

  const { missingAptosWallet, missingEthWallet, missingOptimismWallet, missingStarknetWallet, missingUsdcWallet } =
    requiredFields || {};

  const isEhterRequired =
    profileType === ProfileType.Individual ||
    (profileType === ProfileType.Company && usdPreferredMethod === PreferredMethod.Crypto);

  return (
    <>
      <div>
        <Input
          label={
            <Flex className="items-center gap-1">
              <Chip>
                <EthereumIcon className="h-3" />
              </Chip>
              {T("profile.form.ethIdentity")}
            </Flex>
          }
          placeholder={T("profile.form.ethIdentityPlaceholder")}
          {...register("ethWallet", {
            pattern: {
              value: ETH_WALLET_OR_ENS_ADDRESS,
              message: T("profile.form.invalidEthWallet"),
            },
          })}
          showRequiredError={(missingUsdcWallet || missingEthWallet) && isEhterRequired}
        />
      </div>
      <Input
        label={
          <Flex className="items-center gap-1">
            <Chip>
              <StarknetIcon className="h-4" />
            </Chip>
            {T("profile.form.starkIdentity")}
          </Flex>
        }
        placeholder={T("profile.form.starkIdentityPlaceholder")}
        {...register("starknetWallet", {
          pattern: {
            value: STARKNET_WALLET,
            message: T("profile.form.invalidStarknetWallet"),
          },
        })}
        showRequiredError={missingStarknetWallet}
      />
      <Input
        label={
          <Flex className="items-center gap-1">
            <Chip>
              <OptimismIcon className="h-4" />
            </Chip>
            {T("profile.form.optimismIdentity")}
          </Flex>
        }
        placeholder={T("profile.form.optimismIdentityPlaceholder")}
        {...register("optimismWallet", {
          pattern: {
            value: OPTIMISM_WALLET,
            message: T("profile.form.invalidOptimismWallet"),
          },
        })}
        showRequiredError={missingOptimismWallet}
      />
      <Input
        label={
          <Flex className="items-center gap-1">
            <Chip>
              <Aptos />
            </Chip>
            {T("profile.form.aptosIdentity")}
          </Flex>
        }
        placeholder={T("profile.form.aptosIdentityPlaceholder")}
        {...register("aptosWallet", {
          pattern: {
            value: APTOS_WALLET,
            message: T("profile.form.invalidAptosWallet"),
          },
        })}
        showRequiredError={missingAptosWallet}
      />
    </>
  );
}
