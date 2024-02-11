import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const MeActionTags = {
  user: () => `${RESSOURCE_TAGS.ME}-user`,
  rewarded_pending_invoice: () => `${RESSOURCE_TAGS.ME}-rewarded_pending_invoice`,
  individual_billing_profiles: () => `${RESSOURCE_TAGS.ME}-individual_billing_profiles`,
  company_billing_profiles: () => `${RESSOURCE_TAGS.ME}-company_billing_profiles`,
};
