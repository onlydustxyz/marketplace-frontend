import { BaseQueries } from "actions/base-queries.actions";
import { ACTION_PATH } from "actions/path.actions";
import { BaseQueriesOptions } from "actions/type.actions";

import { components } from "src/__generated/api";

import { BillingProfilesActionTags } from "./billing-profiles-tags.actions";

export type InvoicePreviewResponse = components["schemas"]["InvoicePreviewResponse"];
export async function retrieveInvoicePreviewByBillingProfileId(billingProfileId: string, options?: BaseQueriesOptions) {
  return BaseQueries<InvoicePreviewResponse>(ACTION_PATH.INVOICE_PREVIEW_BY_ID(billingProfileId), {
    provideTag: [BillingProfilesActionTags.invoice_preview(billingProfileId)],
    ...(options || {}),
  });
}

export default {
  retrieveInvoicePreviewByBillingProfileId,
};
