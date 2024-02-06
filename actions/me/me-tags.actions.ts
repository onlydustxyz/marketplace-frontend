import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const MeActionTags = {
  user: () => `${RESSOURCE_TAGS.ME}-user`,
  rewarded_pending_invoice: () => `${RESSOURCE_TAGS.ME}-rewarded_pending_invoice`,
};
