import Tag, { TagSize } from "src/components/Tag";
import Box from "src/components/Utils/Box";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";
import { RequiredFieldsType } from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel/usePayoutInfoValidation";

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

function getNetworkMessage(key: string, isFiat?: boolean) {
  const networksMessages: Record<keyof RequiredFieldsType, string> = {
    missingAptosWallet: "profile.missing.networkFull.APT",
    missingEthWallet: "profile.missing.networkFull.ETH",
    missingOptimismWallet: "profile.missing.networkFull.OP",
    missingSepaAccount: isFiat ? "profile.missing.networkFull.USD" : "profile.missing.networkFull.ETH",
    missingUsdcWallet: isFiat ? "profile.missing.networkFull.USD" : "profile.missing.networkFull.ETH",
    missingStarknetWallet: "profile.missing.networkFull.STARK",
  };

  return networksMessages[key as keyof typeof networksMessages];
}

type StatusTagType = {
  isValid: boolean;
  type: StatusType;
  requiredNetworks?: Record<string, boolean>;
  isFiat?: boolean;
};

export function StatusTag({ isValid, type, requiredNetworks, isFiat }: StatusTagType) {
  const { T } = useIntl();

  const networks = requiredNetworks
    ? Object.entries(requiredNetworks)
        .filter(([, value]) => value)
        .map(([key]) => T(getNetworkMessage(key, isFiat)))
    : [];

  const uniqueNetworks = [...new Set(networks)];

  return (
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
              {T(invalidMessages[type], { networks: uniqueNetworks.join(", ") })}
            </>
          )}
        </div>
      </Tag>
    </Box>
  );
}
