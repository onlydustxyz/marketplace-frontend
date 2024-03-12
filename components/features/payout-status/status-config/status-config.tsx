import { VariantProps } from "tailwind-variants";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { tagVariants } from "components/ds/tag/tag.variants";
import { TPayoutStatus } from "components/features/payout-status/payout-status.types";
import { TStatusConfig } from "components/features/payout-status/status-config/status-config.types";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

function createStatusConfig(
  config: Omit<TStatusConfig.ReturnType, "icon" | "borderColor"> & { icon: string; borderColor: string }
): TStatusConfig.ReturnType {
  return {
    ...config,
    icon: config.icon as RemixIconsName,
    borderColor: config.borderColor as VariantProps<typeof tagVariants>["borderColor"],
  };
}
export function getStatusConfig({ status, dateRelativeToNow, date }: TStatusConfig.Props): TStatusConfig.ReturnType {
  const defaultDate = date ? getFormattedDateToLocaleDateString(new Date(date)) : "";

  const statusConfigs: Record<TPayoutStatus.PaymentStatusUnion, TStatusConfig.ReturnType> = {
    COMPLETE: createStatusConfig({
      icon: "ri-check-line",
      labelToken: "v2.features.payoutStatus.complete.label",
      tooltipToken: "v2.features.payoutStatus.processedOnDate",
      tooltipParams: { date: defaultDate },
      borderColor: "grey",
      iconClassName: "text-snow",
    }),
    LOCKED: createStatusConfig({
      icon: "ri-lock-fill",
      labelToken: "v2.features.payoutStatus.locked.label",
      tooltipToken:
        dateRelativeToNow?.status === "past"
          ? "v2.features.payoutStatus.unlockedOnDate"
          : dateRelativeToNow?.status === "future"
          ? "v2.features.payoutStatus.lockedUntilDate"
          : "v2.features.payoutStatus.lockedUntilFurther",
      tooltipParams: { date: defaultDate },
      borderColor: "grey",
      iconClassName: "text-snow",
    }),
    PENDING_INVOICE: createStatusConfig({
      icon: "ri-loader-2-line",
      labelToken: "v2.features.payoutStatus.pendingRequest.label",
      tooltipToken: "v2.features.payoutStatus.pendingRequest.tooltip",
      tooltipParams: {},
      borderColor: "multi-color",
      iconClassName: "text-snow",
    }),
    PENDING_SIGNUP: createStatusConfig({
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.pendingSignup.label",
      tooltipToken: "v2.features.payoutStatus.pendingSignup.tooltip",
      tooltipParams: {},
      borderColor: "grey",
      iconClassName: "text-snow",
    }),
    PROCESSING: createStatusConfig({
      icon: "ri-time-line",
      labelToken: "v2.features.payoutStatus.processing.label",
      tooltipToken: "v2.features.payoutStatus.processing.tooltip",
      tooltipParams: {},
      borderColor: "grey",
      iconClassName: "text-snow",
    }),
    PAYOUT_INFO_MISSING: createStatusConfig({
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.payoutInfoMissing.label",
      tooltipToken: "v2.features.payoutStatus.payoutInfoMissing.tooltip",
      tooltipParams: {},
      borderColor: "orange",
      iconClassName: "text-orange-500",
    }),
    PENDING_VERIFICATION: createStatusConfig({
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.pendingVerification.label",
      tooltipToken: "v2.features.payoutStatus.pendingVerification.tooltip",
      tooltipParams: {},
      borderColor: "orange",
      iconClassName: "text-orange-500",
    }),
    PENDING_CONTRIBUTOR: createStatusConfig({
      icon: "ri-user-3-line",
      labelToken: "v2.features.payoutStatus.pendingContributor.label",
      tooltipToken: "v2.features.payoutStatus.pendingContributor.tooltip",
      tooltipParams: {},
      borderColor: "grey",
      iconClassName: "text-snow",
    }),
    PAYMENT_BLOCKED: createStatusConfig({
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.paymentBlocked.label",
      tooltipToken: "v2.features.payoutStatus.paymentBlocked.tooltip",
      tooltipParams: {},
      borderColor: "red",
      iconClassName: "text-red-500",
    }),
    PENDING_BILLING_PROFILE: createStatusConfig({
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.pendingBillingProfile.label",
      tooltipToken: "v2.features.payoutStatus.pendingBillingProfile.tooltip",
      tooltipParams: {},
      borderColor: "orange",
      iconClassName: "text-orange-500",
    }),
    PENDING_REQUEST: createStatusConfig({
      icon: "ri-loader-2-line",
      labelToken: "v2.features.payoutStatus.pendingRequest.label",
      tooltipToken: "v2.features.payoutStatus.pendingRequest.tooltip",
      tooltipParams: {},
      borderColor: "multi-color",
      iconClassName: "text-snow",
    }),
  };

  return (
    statusConfigs[status] || {
      icon: "",
      labelToken: "",
      tooltipToken: "",
      tooltipParams: {},
      borderColor: "grey",
      iconClassName: "text-snow",
    }
  );
}
