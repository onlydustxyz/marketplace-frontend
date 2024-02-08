import { UseBillingProfileResponse } from "src/api/me/billing/queries";
import { MeBillingTypes } from "src/api/me/billing/types";

export namespace MeBillingConstants {
  export const statusMapping: Record<UseBillingProfileResponse["status"], MeBillingTypes.statusMapping> = {
    CLOSED: {
      icon: "ri-information-line",
      label: "v2.commons.enums.me.billingProfileStatus.CLOSED",
      type: "error",
    },
    INVALIDATED: {
      icon: "ri-information-line",
      label: "v2.commons.enums.me.billingProfileStatus.INVALIDATED",
      type: "error",
    },
    NOT_STARTED: {
      icon: "ri-information-line",
      label: "v2.commons.enums.me.billingProfileStatus.NOT_STARTED",
      type: "warning",
    },
    REJECTED: {
      icon: "ri-information-line",
      label: "v2.commons.enums.me.billingProfileStatus.REJECTED",
      type: "error",
    },
    STARTED: {
      icon: "ri-information-line",
      label: "v2.commons.enums.me.billingProfileStatus.STARTED",
      type: "warning",
    },
    UNDER_REVIEW: {
      icon: "ri-information-line",
      label: "v2.commons.enums.me.billingProfileStatus.UNDER_REVIEW",
      type: "warning",
    },
    VERIFIED: {
      icon: "ri-information-line",
      label: "v2.commons.enums.me.billingProfileStatus.VERIFIED",
      type: "success",
    },
  };
}
