import { describe, expect, it } from "vitest";

import { BillingProfileShort, BillingProfileShortResponse } from "./billing-profile-short-model";

const defaultBillingProfile: BillingProfileShortResponse = {
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

describe("BillingProfileShort", () => {
  it("should return true when individual limit is reached", () => {
    const profile = new BillingProfileShort({
      ...defaultBillingProfile,
      individualLimitReached: true,
    });
    expect(profile.isIndividualLimitReached()).toEqual(true);
  });

  it("should return payment progression", () => {
    const profile = new BillingProfileShort({
      ...defaultBillingProfile,
      currentYearPaymentLimit: 5001,
      currentYearPaymentAmount: 4500,
      individualLimitReached: false,
    });

    expect(profile.getCurrentYearPaymentAmount()).toEqual(4500);
    expect(profile.getLimitAmount()).toEqual(5000);
    expect(profile.getCurrentProgressionAmount(0)).toEqual(4500);
    expect(profile.getHasReachedProgressionLimit()).toEqual(false);
  });

  it("should return payment progression with dynamic value", () => {
    const profile = new BillingProfileShort({
      ...defaultBillingProfile,
      currentYearPaymentLimit: 5001,
      currentYearPaymentAmount: 4500,
      individualLimitReached: true,
    });

    const profileReached = new BillingProfileShort({
      ...defaultBillingProfile,
      currentYearPaymentLimit: 5001,
      currentYearPaymentAmount: 4500,
      individualLimitReached: true,
    });

    expect(profile.getCurrentYearPaymentAmount()).toEqual(4500);
    expect(profile.getLimitAmount()).toEqual(5000);
    expect(profile.getHasReachedProgressionLimit(300)).toEqual(false);
    expect(profile.getCurrentProgressionAmount(300)).toEqual(4800);

    expect(profileReached.getCurrentYearPaymentAmount()).toEqual(4500);
    expect(profileReached.getLimitAmount()).toEqual(5000);
    expect(profileReached.getHasReachedProgressionLimit(501)).toEqual(true);
    expect(profileReached.getCurrentProgressionAmount(501)).toEqual(5001);
  });
});
