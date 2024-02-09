import { BaseQueries } from "actions/base-queries.actions";
import { MeActionTags } from "actions/me/me-tags.actions";
import { ACTION_PATH } from "actions/path.actions";
import { BaseQueriesOptions } from "actions/type.actions";

import { components } from "src/__generated/api";

export type MeInformations = components["schemas"]["GetMeResponse"];
export async function retrieveMeInformations(options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<MeInformations>(ACTION_PATH.ME, {
    provideTag: [MeActionTags.user()],
    ...(options || {}),
  });
}

export type PendingInvoiceResponse = components["schemas"]["MyRewardPageItemResponse"][];

export async function retrieveRewardsPendingInvoices(options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<PendingInvoiceResponse>(ACTION_PATH.ME_REWARDS_PENDING_INVOICE, {
    provideTag: [MeActionTags.rewarded_pending_invoice()],
    ...(options || {}),
  });
}

export default {
  retrieveRewardsPendingInvoices,
  retrieveMeInformations,
};
