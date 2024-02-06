import { BaseQueries } from "actions/base-queries.actions";
import { MeActionTags } from "actions/me/me-tags.actions";
import { ACTION_PATH } from "actions/path.actions";
import { BaseQueriesOptions } from "actions/type.actions";

import { components } from "src/__generated/api";

export type PendingInvoiceResponse = components["schemas"]["MyRewardsListResponse"];

export async function retrieveRewardsPendingInvoices(options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<PendingInvoiceResponse>(ACTION_PATH.ME_REWARDS_PENDING_INVOICE, {
    provideTag: [MeActionTags.rewarded_pending_invoice()],
    ...(options || {}),
  });
}

export default {
  retrieveRewardsPendingInvoices,
};
