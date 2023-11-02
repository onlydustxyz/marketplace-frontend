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
  requiredFields: RequiredFieldsType;
} {
  let isContactInfoComplete = false;

  const { hasValidContactInfo, payoutSettings, location, company, person, isCompany } = user || {};
  const { address, city, country, postalCode } = location || {};
  const { missingAptosWallet, missingEthWallet, missingOptimismWallet, missingSepaAccount, missingStarknetWallet } =
    payoutSettings || {};

  if (address && city && country && postalCode) {
    if (isCompany && company) {
      isContactInfoComplete = Boolean(
        company.name && company.identificationNumber && company.owner?.firstname && company.owner?.lastname
      );
    } else {
      isContactInfoComplete = Boolean(person?.firstname && person?.lastname);
    }
  }

  return {
    isContactInfoComplete: Boolean(isContactInfoComplete),
    isContactInfoValid: Boolean(hasValidContactInfo),
    isPaymentInfoValid: Boolean(payoutSettings?.hasValidPayoutSettings),
    requiredFields: {
      missingAptosWallet,
      missingEthWallet,
      missingOptimismWallet,
      missingSepaAccount,
      missingStarknetWallet,
    },
  };
}
