import { MeTypes } from "src/api/me/types";
import { RESSOURCE_TAGS } from "src/api/ressource-tags";

// TODO SE USAGE AFTER PENNYLANE
export const ME_BILLING_TAGS = {
  all: [RESSOURCE_TAGS.ME, "billing"],
  anyProfile: [RESSOURCE_TAGS.ME, "billing-profile"],
  profile: (profile: MeTypes.billingProfileUnion) => [...ME_BILLING_TAGS.anyProfile, { billingProfile: profile }],
};
