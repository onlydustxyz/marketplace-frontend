import { ACTIONS_RESSOURCES } from "actions/ressources.actions";

export const BillingProfilesActionTags = {
  invoice_preview: (billingProfileId: string) =>
    `${ACTIONS_RESSOURCES.BILLING_PROFILES}-${billingProfileId}-invoice-preview`,
};
