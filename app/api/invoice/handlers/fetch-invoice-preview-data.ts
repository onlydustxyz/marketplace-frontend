import { BillingProfilesActions } from "actions/billing-profiles/billing-profiles.actions";

export async function fetchInvoicePreviewData({
  token,
  rewardIds,
  billingProfileId,
}: {
  token: string | null;
  rewardIds: string;
  billingProfileId: string;
}) {
  if (!token) throw new Error("Token is required");
  return await BillingProfilesActions.queries
    .retrieveInvoicePreviewByBillingProfileId(billingProfileId, {
      accessToken: token,
      params: {
        rewardIds,
      },
    })
    .then(res => res)
    .catch(() => {
      throw new Error("Failed to fetch invoice preview data.");
    });
}
