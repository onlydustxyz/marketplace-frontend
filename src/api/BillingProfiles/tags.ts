import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const BILLING_PROFILES_TAGS = {
  ALL: [RESSOURCE_TAGS.BILLING_PROFILES],
  ME: [RESSOURCE_TAGS.ME, RESSOURCE_TAGS.BILLING_PROFILES],
  SINGLE: (billingProfileId: string) => [RESSOURCE_TAGS.BILLING_PROFILES, { billingProfileId }],
};
