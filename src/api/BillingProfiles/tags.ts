import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const BILLING_PROFILES_TAGS = {
  all: [RESSOURCE_TAGS.BILLING_PROFILES],
  me: [RESSOURCE_TAGS.ME, RESSOURCE_TAGS.BILLING_PROFILES],
  single: (billingProfileId: string) => [
    RESSOURCE_TAGS.BILLING_PROFILES,
    "billing-profile-single",
    { billingProfileId },
  ],
  billing_profile_coworkers: (billingProfileId: string) => [
    RESSOURCE_TAGS.BILLING_PROFILES,
    "billing-profile-coworkers",
    { billingProfileId },
  ],
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
  invoiceable_rewards: (billingProfileId: string) => [
    RESSOURCE_TAGS.BILLING_PROFILES,
    "invoiceable-rewards",
    { billingProfileId },
  ],
};
