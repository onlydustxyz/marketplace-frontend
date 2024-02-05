import { MeTypes } from "src/api/me/types";
import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const ME_BILLING_TAGS = {
  all: [RESSOURCE_TAGS.ME, "billing"],
  profile: (profile: `${MeTypes.billingProfileType}`) => [
    RESSOURCE_TAGS.ME,
    "billing-profile",
    { billingProfile: profile },
  ],
};
