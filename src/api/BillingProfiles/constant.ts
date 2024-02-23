import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

export namespace BillingProfileConstant {
  export const profileTypeMapping: Record<UseGetBillingProfileById["type"], BillingProfilesTypes.profileTypeMapping> = {
    SELF_EMPLOYED: {
      icon: { remixName: "ri-suitcase-line" },
    },
    INDIVIDUAL: {
      icon: { remixName: "ri-user-line" },
    },
    COMPANY: {
      icon: { remixName: "ri-vip-crown-line" },
    },
  };
}
