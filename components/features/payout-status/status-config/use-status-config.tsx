import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { TStatusConfig } from "components/features/payout-status/status-config/status-config.types";

export function useStatusConfig({ status, dateRelativeToNow, date }: TStatusConfig.Props) {
  const defaultDate = date ? getFormattedDateToLocaleDateString(new Date(date)) : "";

  const statusConfigs = {
    COMPLETE: {
      icon: "ri-check-line",
      labelToken: "v2.features.payoutStatus.complete.label",
      tooltipToken: "v2.features.payoutStatus.processedOnDate",
      tooltipParams: { date: defaultDate },
      borderColor: "grey",
      iconClassName: "text-snow",
    },
    LOCKED: {
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
    },
    PENDING_INVOICE: {
      icon: "ri-loader-2-line",
      labelToken: "v2.features.payoutStatus.invoicePending.label",
      tooltipToken: "v2.features.payoutStatus.invoicePending.tooltip",
      tooltipParams: {},
      borderColor: "multi-color",
      iconClassName: "text-snow",
    },
    PENDING_SIGNUP: {
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.pendingSignup.label",
      tooltipToken: "v2.features.payoutStatus.pendingSignup.tooltip",
      tooltipParams: {},
      borderColor: "grey",
      iconClassName: "text-snow",
    },
    PROCESSING: {
      icon: "ri-time-line",
      labelToken: "v2.features.payoutStatus.processing.label",
      tooltipToken: "v2.features.payoutStatus.processing.tooltip",
      tooltipParams: {},
      borderColor: "grey",
      iconClassName: "text-snow",
    },
    MISSING_PAYOUT_INFO: {
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.payoutInfoMissing.label",
      tooltipToken: "v2.features.payoutStatus.payoutInfoMissing.tooltip",
      tooltipParams: {},
      borderColor: "orange",
      iconClassName: "text-orange-500",
    },
    PENDING_VERIFICATION: {
      icon: "ri-error-warning-line",
      labelToken: "v2.features.payoutStatus.pendingVerification.label",
      tooltipToken: "v2.features.payoutStatus.pendingVerification.tooltip",
      tooltipParams: {},
      borderColor: "orange",
      iconClassName: "text-orange-500",
    },
    PENDING_CONTRIBUTOR: {
      icon: "ri-user-3-line",
      labelToken: "v2.features.payoutStatus.pendingContributor.label",
      tooltipToken: "v2.features.payoutStatus.pendingContributor.tooltip",
      tooltipParams: {},
      borderColor: "grey",
      iconClassName: "text-snow",
    },
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
