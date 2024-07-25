import { components } from "src/__generated/api";

// TODO Remove Omit when backend has the same field in short and long response
export type BillingProfileShortResponse = Omit<
  components["schemas"]["ShortBillingProfileResponse"],
  "role" | "requestableRewardCount" | "rewardCount" | "invoiceableRewardCount"
>;

export interface BillingProfileShortInterface extends BillingProfileShortResponse {
  isIndividualLimitReached(): boolean;
  getLimitAmount(): number | null;
  getCurrentYearPaymentAmount(): number;
  getCurrentProgressionAmount(amount: number): number;
  getHasReachedProgressionLimit(amount: number): boolean;
}

export class BillingProfileShort implements BillingProfileShortInterface {
  currentYearPaymentAmount!: BillingProfileShortResponse["currentYearPaymentAmount"];
  currentYearPaymentLimit!: BillingProfileShortResponse["currentYearPaymentLimit"];
  enabled!: BillingProfileShortResponse["enabled"];
  id!: BillingProfileShortResponse["id"];
  individualLimitReached!: BillingProfileShortResponse["individualLimitReached"];
  invoiceMandateAccepted!: BillingProfileShortResponse["invoiceMandateAccepted"];
  missingPayoutInfo!: BillingProfileShortResponse["missingPayoutInfo"];
  missingVerification!: BillingProfileShortResponse["missingVerification"];
  name!: BillingProfileShortResponse["name"];
  pendingInvitationResponse!: BillingProfileShortResponse["pendingInvitationResponse"];
  type!: BillingProfileShortResponse["type"];
  verificationBlocked!: BillingProfileShortResponse["verificationBlocked"];

  constructor(props: BillingProfileShortResponse) {
    Object.assign(this, props);
  }

  isIndividualLimitReached() {
    return this.individualLimitReached || false;
  }

  getLimitAmount() {
    if (!this.currentYearPaymentLimit) {
      return null;
    }

    return this.currentYearPaymentLimit > 0 ? this.currentYearPaymentLimit - 1 : this.currentYearPaymentLimit;
  }

  getCurrentYearPaymentAmount() {
    return this.currentYearPaymentAmount || 0;
  }

  getCurrentProgressionAmount(amount: number = 0) {
    return this.getCurrentYearPaymentAmount() + amount;
  }

  getHasReachedProgressionLimit(amount: number = 0) {
    if (!this?.currentYearPaymentLimit) {
      return false;
    }

    return this.getCurrentProgressionAmount(amount) >= this.currentYearPaymentLimit;
  }
}
