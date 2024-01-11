import Tag, { TagSize } from "src/components/Tag";
import Box from "src/components/Utils/Box";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";
import { RequiredFieldsType } from "src/App/Stacks/PayoutInfoSidePanel/usePayoutInfoValidation";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export enum StatusType {
  Contact = "CONTACT",
  Payment = "PAYMENT",
}

const validMessages = {
  [StatusType.Contact]: "profile.form.contactSettingsValidTag",
  [StatusType.Payment]: "profile.form.payoutSettingsValidTag",
};

const invalidMessages = {
  [StatusType.Contact]: "profile.missing.contact",
  [StatusType.Payment]: "profile.missing.payment",
};

function getNetworkMessage(key: string) {
  const networksMessages: Record<keyof RequiredFieldsType, string> = {
    missingAptosWallet: "profile.missing.networkFull.APT",
    missingEthWallet: "profile.missing.networkFull.ETH",
    missingOptimismWallet: "profile.missing.networkFull.OP",
    missingSepaAccount: "profile.missing.networkFull.USD",
    missingStarknetWallet: "profile.missing.networkFull.STRK",
  };

  return networksMessages[key as keyof typeof networksMessages];
}

type StatusTagType = {
  isValid: boolean;
  type: StatusType;
  requiredNetworks?: RequiredFieldsType;
};

export function StatusTag({ isValid, type, requiredNetworks }: StatusTagType) {
  const { T } = useIntl();
  const { watch } = useFormContext();
  const [ethWallet, iban, bic, aptosWallet, starknetWallet, optimismWallet] = watch([
    "ethWallet",
    "iban",
    "bic",
    "aptosWallet",
    "starknetWallet",
    "optimismWallet",
  ]);
  const networks = useMemo(() => {
    const missingSepaAccount = Boolean(requiredNetworks?.missingSepaAccount) && !iban && !bic;
    const missingEthWallet = Boolean(requiredNetworks?.missingEthWallet) && !ethWallet;
    const missingAptosWallet = Boolean(requiredNetworks?.missingAptosWallet) && !aptosWallet;
    const missingStarknetWallet = Boolean(requiredNetworks?.missingStarknetWallet) && !starknetWallet;
    const missingOptimismWallet = Boolean(requiredNetworks?.missingOptimismWallet) && !optimismWallet;

    const networkMessages = Object.entries({
      missingSepaAccount,
      missingEthWallet,
      missingAptosWallet,
      missingStarknetWallet,
      missingOptimismWallet,
    })
      .filter(([, value]) => value)
      .map(([key]) => T(getNetworkMessage(key)));

    return [...new Set(networkMessages)];
  }, [requiredNetworks]);

  return type !== StatusType.Payment || networks.length > 0 ? (
    <Box className="pb-6">
      <Tag size={TagSize.Medium} className="px-4">
        <div
          className={cn({
            "text-orange-500": !isValid,
          })}
        >
          {isValid ? (
            <div className="flex flex-row items-center gap-1">
              <CheckLine /> {T(validMessages[type])}
            </div>
          ) : (
            <>
              <ErrorWarningLine className="mr-1 text-orange-500" />
              {T(invalidMessages[type], { networks: networks.join(", ") })}
            </>
          )}
        </div>
      </Tag>
    </Box>
  ) : null;
}
