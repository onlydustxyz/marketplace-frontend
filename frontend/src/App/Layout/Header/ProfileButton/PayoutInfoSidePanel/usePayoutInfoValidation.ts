import { UserPayout } from "src/types";

// Contact & payout informations validation hook
export function usePayoutInfoValidation(user: UserPayout): {
  isContactInfoValid: boolean;
  isPaymentInfoValid: boolean;
} {
  const { identity, location, payoutSettings } = user || {};
  const { Person, Company } = identity || {};

  let isContactInfoValid = false;
  let isPaymentInfoValid = false;

  if (location) {
    if (location.address && location.city && location.country && location.post_code) {
      if (Person) {
        isContactInfoValid = !!(Person.firstname && Person.lastname);
      }

      if (Company) {
        isContactInfoValid =
          !!(Company.name && Company.identification_number) && !!(Company.owner.firstname && Company.owner.lastname);
      }
    }
  }

  if (payoutSettings) {
    const isUsd = !!payoutSettings.usd_preferred_method;

    if (isUsd) {
      isPaymentInfoValid = !!(payoutSettings.bankAddress.BIC || payoutSettings.bankAddress.IBAN);
    } else {
      const conditionsArray = [
        !!(payoutSettings.ethName && payoutSettings.ethAddress),
        !!(payoutSettings.starknetName && payoutSettings.starknetAddress),
        !!(payoutSettings.optimismName && payoutSettings.optimismAddress),
        !!(payoutSettings.aptosmName && payoutSettings.aptosAddress),
      ];

      isPaymentInfoValid = conditionsArray.includes(true);
    }
  }

  return { isContactInfoValid, isPaymentInfoValid };
}
