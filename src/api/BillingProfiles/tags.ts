import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const BILLING_PROFILES_TAGS = {
  all: [RESSOURCE_TAGS.BILLING_PROFILES],
  me: [RESSOURCE_TAGS.ME, RESSOURCE_TAGS.BILLING_PROFILES],
  single: (billingProfileId: string) => [RESSOURCE_TAGS.BILLING_PROFILES, { billingProfileId }],
  upload_invoice_linked_to_profile: (billingProfileId: string) => [
    RESSOURCE_TAGS.BILLING_PROFILES,
    "upload-invoice",
    { billingProfileId },
  ],
  invoices_linked_to_profile: (billingProfileId: string) => [
    RESSOURCE_TAGS.BILLING_PROFILES,
    "all-invoices",
    { billingProfileId },
  ],
  download_invoices_linked_to_profile: (billingProfileId: string, invoiceId: string) => [
    RESSOURCE_TAGS.BILLING_PROFILES,
    "download-invoice",
    { billingProfileId, invoiceId },
  ],
};
