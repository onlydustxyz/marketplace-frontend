import { ACTIONS_RESSOURCES } from "actions/ressources.actions";

export const MeActionTags = {
  user: () => `${ACTIONS_RESSOURCES.ME}-user`,
  rewarded_pending_invoice: () => `${ACTIONS_RESSOURCES.ME}-rewarded_pending_invoice`,
  individual_billing_profiles: () => `${ACTIONS_RESSOURCES.ME}-individual_billing_profiles`,
  company_billing_profiles: () => `${ACTIONS_RESSOURCES.ME}-company_billing_profiles`,
};
