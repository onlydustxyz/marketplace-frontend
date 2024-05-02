import { useMemo } from "react";

import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import MeBillingProfilesApi from "src/api/me/billing";

import { getSpecialIconColor } from "hooks/billings-profiles/utils/get-special-icon-color";
import { getSpecialIconName } from "hooks/billings-profiles/utils/get-special-icon-name";
import { getSpecialTagColor } from "hooks/billings-profiles/utils/get-special-tag-color";

import { TUseBillingProfiles } from "./use-billing-profiles.types";

export const useBillingProfiles = (): TUseBillingProfiles.Return => {
  const { data, isLoading } = MeBillingProfilesApi.queries.useAllBillingProfiles({});

  const profiles = useMemo(() => {
    if (!data?.billingProfiles?.length) {
      return [];
    }

    return data.billingProfiles.map(profile => {
      const hasWarning = profile?.missingPayoutInfo || profile?.missingVerification;
      const hasError = profile?.verificationBlocked || profile?.individualLimitReached;
      const hasOverride = hasWarning || hasError || profile.role === "MEMBER" || !profile.enabled;
      const overrides = hasOverride
        ? {
            icon: getSpecialIconName({ hasError, hasWarning, role: profile.role, enabled: profile.enabled }),
            iconColor: getSpecialIconColor({ hasError, hasWarning }),
            tagColor: getSpecialTagColor({ hasError, hasWarning }),
          }
        : null;
      return {
        data: profile,
        icon: BillingProfileConstant.profileTypeMapping[profile.type].icon,
        overrides,
      };
    });
  }, [data]);

  const hasIndividualProfile = useMemo(() => {
    return profiles.some(profile => profile.data.type === BillingProfilesTypes.type.Individual);
  }, [profiles]);

  return { data, isLoading, profiles, hasIndividualProfile };
};
