import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";
import { MeBillingTypes } from "src/api/me/billing/types";

export namespace MeBillingConstants {
  export const statusMapping: Record<UseGetBillingProfileById["status"], MeBillingTypes.statusMapping> = {
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
