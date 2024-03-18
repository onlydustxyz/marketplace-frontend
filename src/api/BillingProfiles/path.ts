import { BASE_API_V1 } from "src/api/ApiPath";

export const BILLING_PROFILES_PATH = {
  ME_BILLING_PROFILES: BASE_API_V1("me/billing-profiles"),
  ROOT: BASE_API_V1("billing-profiles/"),
  BY_ID: (id: string) => BASE_API_V1(`billing-profiles/${id}`),
  PAYOUT: (id: string) => BASE_API_V1(`billing-profiles/${id}/payout-info`),
  INVOICE_LINKED_TO_PROFILE: (billingProfileId: string) => BASE_API_V1(`billing-profiles/${billingProfileId}/invoices`),
  DOWNLOAD_INVOICE_LINKED_TO_PROFILE: (billingProfileId: string, invoiceId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/${invoiceId}`),
  UPLOAD_INVOICE_LINKED_TO_PROFILE: (billingProfileId: string, invoiceId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/${invoiceId}`),
  ACCEPT_INVOICE_MANDATE: (billingProfileId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/mandate`),
  COWORKERS: (id: string) => BASE_API_V1(`billing-profiles/${id}/coworkers`),
  INVITE_COWORKER_BY_ID: (billingProfileId: string) => BASE_API_V1(`billing-profiles/${billingProfileId}/coworkers`),
  DELETE_COWORKER_BY_ID: (billingProfileId: string, githubUserId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/coworkers/${githubUserId}`),
};
