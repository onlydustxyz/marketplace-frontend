import { ACTIONS_RESSOURCES } from "actions/ressources.actions";

export const HackathonsActionTags = {
  hackathons_list: `${ACTIONS_RESSOURCES.HACKATHONS}`,
  hackathons_by_slug: (slug: string) => `${ACTIONS_RESSOURCES.HACKATHONS}-by-slug-${slug}`,
};
