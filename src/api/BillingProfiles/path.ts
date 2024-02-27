import { BASE_API_V1, BASE_API_V2 } from "src/api/ApiPath";

export const BILLING_PROFILES_PATH = {
  meBillingProfiles: BASE_API_V2("me/billing-profiles"),
  root: BASE_API_V1("billing-profiles/"),
  byId: (id: string) => BASE_API_V1(`billing-profiles/${id}/`),
  payout: (id: string) => BASE_API_V1(`billing-profiles/${id}/payout-info`),
  invoicesLinkedToProfil: (billingProfileId: string) => BASE_API_V1(`billing-profiles/${billingProfileId}/invoices`),
  downloadInvoiceLinkedToProfil: (billingProfileId: string, invoiceId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/${invoiceId}`),
  uploadInvoiceLinkedToProfil: (billingProfileId: string, invoiceId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/${invoiceId}`),
  acceptInvoiceMandate: (billingProfileId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/mandate`),
};
