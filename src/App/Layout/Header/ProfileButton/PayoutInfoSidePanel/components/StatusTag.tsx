import Tag, { TagSize } from "src/components/Tag";
import Box from "src/components/Utils/Box";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";
import { RequiredFieldsType } from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel/usePayoutInfoValidation";
import { useMemo } from "react";

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
  requiredNetworks?: RequiredFieldsType;
  isFiat?: boolean;
  isCompany?: boolean;
  isBankWire?: boolean;
};

export function StatusTag({ isValid, type, requiredNetworks, isFiat, isCompany, isBankWire }: StatusTagType) {
  const { T } = useIntl();

  /** SHOW IBAN MESSAGE
   * 1 : isCompany && bank wire tab && ( missingUsdcWallet || missingSepaAccount )
   * Then show iban message
   */
  /** SHOW ETH MESSAGE
   * 1 : !isCompany && (missingUsdcWallet  || missingEthWallet || missingSepaAccount) then show eth message
   * 2 : isCompany && crypto tabs && (missingUsdcWallet || missingSepaAccount || missingEthWallet) -> show eth message
   *
   */
  const networks2 = useMemo(() => {
    const { missingSepaAccount, missingUsdcWallet, missingEthWallet, ...networks } = requiredNetworks || {};
    const debgArray: unknown[] = [];
    const networkMessages = Object.entries(networks)
      .filter(([, value]) => value)
      .map(([key]) => T(getNetworkMessage(key, isFiat)));

    if (isBankWire) {
      if (isCompany && (missingUsdcWallet || missingSepaAccount)) {
        networkMessages.push(T("profile.missing.networkFull.USD"));
        debgArray.push("69", { isCompany, isBankWire, missingUsdcWallet, missingSepaAccount, missingEthWallet });
      }
      if (!isCompany && (missingUsdcWallet || missingSepaAccount)) {
        debgArray.push("72", { isCompany, isBankWire, missingUsdcWallet, missingSepaAccount, missingEthWallet });
        networkMessages.push(T("profile.missing.networkFull.ETH"));
      }
      if (missingEthWallet) {
        debgArray.push("76", { isCompany, isBankWire, missingUsdcWallet, missingSepaAccount, missingEthWallet });
        networkMessages.push(T("profile.missing.networkFull.ETH"));
      }
    } else if (isCompany && (missingUsdcWallet || missingSepaAccount) && missingEthWallet) {
      debgArray.push("80", { isCompany, isBankWire, missingUsdcWallet, missingSepaAccount, missingEthWallet });
      networkMessages.push(T("profile.missing.networkFull.ETH"));
    } else if (missingEthWallet) {
      debgArray.push("83", { isCompany, isBankWire, missingUsdcWallet, missingSepaAccount, missingEthWallet });
      networkMessages.push(T("profile.missing.networkFull.ETH"));
    }

    console.log("----", debgArray);

    return networkMessages;
  }, [requiredNetworks, isCompany, isBankWire]);

  const networks = requiredNetworks
    ? Object.entries(requiredNetworks)
        .filter(([, value]) => value)
        .map(([key]) => T(getNetworkMessage(key, isFiat)))
    : [];

  const uniqueNetworks = [...new Set(networks2)];

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
