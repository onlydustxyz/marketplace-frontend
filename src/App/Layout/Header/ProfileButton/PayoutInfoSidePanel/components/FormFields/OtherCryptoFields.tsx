import { useFormContext } from "react-hook-form";
import { Chip } from "src/components/Chip/Chip";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import AptosIcon from "src/assets/icons/Aptos";
import OptimismIcon from "src/assets/icons/Optimism";
import StarknetIcon from "src/assets/icons/Starknet";
import { APTOS_WALLET, OPTIMISM_WALLET, STARKNET_WALLET } from "src/utils/regex";

export function OtherCryptoFields() {
  const { T } = useIntl();
  const { register } = useFormContext();

  return (
    <>
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
      />
      <Input
        label={
          <Flex className="items-center gap-1">
            <Chip>
              <AptosIcon className="h-4 bg-white" />
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
      />
    </>
  );
}
