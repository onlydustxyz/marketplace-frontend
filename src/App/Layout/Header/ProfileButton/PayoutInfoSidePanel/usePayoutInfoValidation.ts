import { useMemo } from "react";
import { UserPayoutType } from "./PayoutInfoSidePanel";

export type RequiredFieldsType = {
  missingAptosWallet?: boolean;
  missingEthWallet?: boolean;
  missingOptimismWallet?: boolean;
  missingSepaAccount?: boolean;
  missingStarknetWallet?: boolean;
};

// Contact & payout informations validation hook
export function usePayoutInfoValidation(user?: UserPayoutType): {
  isContactInfoValid: boolean;
  isContactInfoComplete: boolean;
  isPaymentInfoValid: boolean;
  isPayoutInfoComplete: boolean;
  requiredFields: RequiredFieldsType;
} {
  const { hasValidContactInfo, payoutSettings, location, company, person, isCompany } = user || {};
  const { address, city, country, postalCode } = location || {};
  const {
    missingAptosWallet,
    missingEthWallet,
    missingOptimismWallet,
    missingSepaAccount,
    missingStarknetWallet,
    sepaAccount,
    ethAddress,
    ethName,
    starknetAddress,
    aptosAddress,
    optimismAddress,
  } = payoutSettings || {};

  const isContactInfoComplete = useMemo(() => {
    if (address && city && country && postalCode) {
      if (isCompany && company) {
        return Boolean(
          company.name && company.identificationNumber && company.owner?.firstname && company.owner?.lastname
        );
      }
      return Boolean(person?.firstname && person?.lastname);
    }
    return false;
  }, [address, city, country, postalCode, company, isCompany, person]);

  const isPayoutInfoComplete = useMemo(() => {
    if ((ethAddress || ethName) && starknetAddress && aptosAddress && optimismAddress) {
      if (isCompany) {
        return Boolean(sepaAccount?.bic && sepaAccount?.iban);
      }
      return true;
    }
    return false;
  }, [ethAddress, ethName, starknetAddress, aptosAddress, optimismAddress, sepaAccount, isCompany]);

  return {
    isContactInfoValid: Boolean(hasValidContactInfo),
    isPaymentInfoValid: Boolean(payoutSettings?.hasValidPayoutSettings),
    isContactInfoComplete,
    isPayoutInfoComplete,
    requiredFields: {
      missingAptosWallet,
      missingEthWallet,
      missingOptimismWallet,
      missingSepaAccount,
      missingStarknetWallet,
    },
  };
}
