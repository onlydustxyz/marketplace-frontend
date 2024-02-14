import { BaseQueries } from "actions/base-queries.actions";
import { BillingProfilesActionTags } from "actions/billing-profiles/billing-profiles-tags.actions";
import { ACTION_PATH } from "actions/path.actions";
import { BaseQueriesOptions } from "actions/type.actions";

import { components } from "src/__generated/api";

export type MeInformations = components["schemas"]["GetMeResponse"];
export async function retrieveInvoicePreviewByBillingProfileId(billingProfileId: string, options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<MeInformations>(ACTION_PATH.INVOICE_PREVIEW_BY_ID(billingProfileId), {
    provideTag: [BillingProfilesActionTags.invoice_preview(billingProfileId)],
    ...(options || {}),
  });
}

export default {
  retrieveInvoicePreviewByBillingProfileId,
};
