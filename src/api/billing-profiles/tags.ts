import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const BILLING_PROFILES_TAGS = {
  all: [RESSOURCE_TAGS.BILLING_PROFILES],
  upload_invoice_linked_to_profile: (billingProfileId: string) => [
    RESSOURCE_TAGS.BILLING_PROFILES,
    "upload-invoice",
    { billingProfileId },
  ],
};
