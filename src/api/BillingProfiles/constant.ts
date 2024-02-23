import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { UseBillingProfileResponse } from "src/api/me/billing/queries";
import { MeBillingTypes } from "src/api/me/billing/types";

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

  export const statusMapping: Record<UseBillingProfileResponse["status"], MeBillingTypes.statusMapping> = {
    CLOSED: {
      icon: { remixName: "ri-error-warning-line" },
      label: "v2.commons.enums.me.billingProfileStatus.CLOSED",
      type: "error",
    },
    NOT_STARTED: {
      icon: { remixName: "ri-error-warning-line" },
      label: "v2.commons.enums.me.billingProfileStatus.NOT_STARTED",
      type: "warning",
    },
    REJECTED: {
      icon: { remixName: "ri-error-warning-line" },
      label: "v2.commons.enums.me.billingProfileStatus.REJECTED",
      type: "error",
    },
    STARTED: {
      icon: { remixName: "ri-error-warning-line" },
      label: "v2.commons.enums.me.billingProfileStatus.STARTED",
      type: "warning",
    },
    UNDER_REVIEW: {
      icon: { remixName: "ri-error-warning-line" },
      label: "v2.commons.enums.me.billingProfileStatus.UNDER_REVIEW",
      type: "warning",
    },
    VERIFIED: {
      icon: { customName: "verified" },
      label: "v2.commons.enums.me.billingProfileStatus.VERIFIED",
      type: "success",
    },
  };
}
