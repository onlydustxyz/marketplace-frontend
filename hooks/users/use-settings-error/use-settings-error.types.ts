export namespace TUseSettingsError {
  export const ERRORS = {
    BILLING_ERROR: "BILLING_ERROR",
    BILLING_WARNING: "BILLING_WARNING",
    PAYOUT: "PAYOUT",
  } as const;

  export interface Return {
    error?: keyof typeof ERRORS;
    isBillingWarning: boolean;
    isBillingError: boolean;
  }
}
