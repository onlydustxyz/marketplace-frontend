import { useMemo } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export function UseBillingProfileIcons() {
  const billingProfilesIcons: Record<BillingProfilesTypes.type, RemixIconsName> = useMemo(() => {
    return {
      [BillingProfilesTypes.type.Individual]: "ri-user-line",
      [BillingProfilesTypes.type.SelfEmployed]: "ri-suitcase-line",
      [BillingProfilesTypes.type.Company]: "ri-vip-crown-line",
    };
  }, []);
  return { billingProfilesIcons };
}
