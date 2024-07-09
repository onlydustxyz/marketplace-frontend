import { describe, expect, it } from "vitest";

import { ShortBillingProfile, ShortBillingProfileResponse } from "./short-billing-profile.model";

const defaultBillingProfile: ShortBillingProfileResponse = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  type: "INDIVIDUAL",
  name: "string",
  currentYearPaymentLimit: 0,
  currentYearPaymentAmount: 0,
  invoiceMandateAccepted: true,
  enabled: true,
  pendingInvitationResponse: true,
  missingPayoutInfo: true,
  missingVerification: true,
  verificationBlocked: true,
  individualLimitReached: false,
};

describe("ShortBillingProfile", () => {
  it("should return true when individual limit is reached", () => {
    const profile = new ShortBillingProfile({
      ...defaultBillingProfile,
      individualLimitReached: true,
    });
    expect(profile.isIndividualLimitReached()).toEqual(true);
  });

  it("should return payment progression", () => {
    const profile = new ShortBillingProfile({
      ...defaultBillingProfile,
      currentYearPaymentLimit: 5001,
      currentYearPaymentAmount: 4500,
      individualLimitReached: false,
    });
    expect(profile.paymentLimitCounter()).toEqual({
      current: 4500,
      limit: 5000,
      hasReached: false,
      remaining: 500,
    });
  });

  it("should return payment progression with dynamic value", () => {
    const profile = new ShortBillingProfile({
      ...defaultBillingProfile,
      currentYearPaymentLimit: 5001,
      currentYearPaymentAmount: 4500,
      individualLimitReached: true,
    });
    expect(profile.paymentLimitCounter(300)).toEqual({
      currentAmount: 4800,
      limitedAmount: 5000,
      hasReachedLimit: false,
    });
  });
});
