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
  isPaymentInfoValid: boolean;
  requiredFields: RequiredFieldsType;
} {
  let isContactInfoValid;

  const { hasValidContactInfo, payoutSettings, location, company, person, isCompany } = user || {};
  const { address, city, country, postalCode } = location || {};
  const { missingAptosWallet, missingEthWallet, missingOptimismWallet, missingSepaAccount, missingStarknetWallet } =
    payoutSettings || {};

  if (address && city && country && postalCode) {
    isContactInfoValid = true;

    if (isCompany && company) {
      isContactInfoValid = Boolean(
        company.name && company.identificationNumber && company.owner?.firstname && company.owner?.lastname
      );
    } else {
      isContactInfoValid = Boolean(person?.firstname && person?.lastname);
    }
  }

  return {
    isContactInfoValid: Boolean(hasValidContactInfo && isContactInfoValid),
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
