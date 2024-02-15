import { BaseQueries } from "actions/base-queries.actions";
import { MeActionTags } from "actions/me/me-tags.actions";
import { ACTION_PATH } from "actions/path.actions";
import { BaseQueriesOptions } from "actions/type.actions";

import { components } from "src/__generated/api";

export type MeInformations = components["schemas"]["GetMeResponse"];
export async function retrieveMeInformations(options?: BaseQueriesOptions) {
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

export type IndividualBillingProfilesResponse = components["schemas"]["IndividualBillingProfileResponse"];

export async function retrieveIndividualBillingProfiles(options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<IndividualBillingProfilesResponse>(ACTION_PATH.ME_INDIVIDUAL_BILLING_PROFILES, {
    provideTag: [MeActionTags.individual_billing_profiles()],
    ...(options || {}),
  });
}

export type CompanyBillingProfilesResponse = components["schemas"]["CompanyBillingProfileResponse"];

export async function retrieveCompanyBillingProfiles(options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<CompanyBillingProfilesResponse>(ACTION_PATH.ME_COMPANY_BILLING_PROFILES, {
    provideTag: [MeActionTags.company_billing_profiles()],
    ...(options || {}),
  });
}

export default {
  retrieveMeInformations,
  retrieveRewardsPendingInvoices,
  retrieveIndividualBillingProfiles,
  retrieveCompanyBillingProfiles,
};
