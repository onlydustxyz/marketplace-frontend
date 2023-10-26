import { UserPayoutSettingsFragment } from "src/__generated/graphql";
import { PreferredMethod } from "src/__generated/graphql";

// Contact & payout informations validation hook
export function usePayoutInfoValidation(user?: UserPayoutSettingsFragment | null): {
  isContactInfoValid: boolean;
  isPaymentInfoValid: boolean;
} {
  const {
    firstname,
    lastname,
    address,
    city,
    postCode,
    country,
    isCompany,
    companyName,
    companyIdentificationNumber,
    usdPreferredMethod,
    ethWallet,
    starknetWallet,
    optimismWallet,
    aptosWallet,
    iban,
    bic,
  } = user || {};

  let isContactInfoValid = false;
  let isPaymentInfoValid = false;

  if (address && city && country && postCode && firstname && lastname) {
    if (isCompany) {
      isContactInfoValid = Boolean(companyName && companyIdentificationNumber);
    }

    isContactInfoValid = true;
  }

  if (usdPreferredMethod === PreferredMethod.Fiat) {
    isPaymentInfoValid = Boolean(bic && iban);
  } else {
    const conditionsArray = [!!ethWallet, !!starknetWallet, !!optimismWallet, !!aptosWallet];
    isPaymentInfoValid = conditionsArray.includes(true);
  }

  return { isContactInfoValid, isPaymentInfoValid };
}
