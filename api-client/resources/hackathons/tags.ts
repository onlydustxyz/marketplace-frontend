import { ACTIONS_RESSOURCES } from "actions/ressources.actions";
import { apiRessources } from "api-client/config/ressources";

export default {
  fetch: {
    root: `${apiRessources.hackathons}`,
    by_slug: (slug: string) => `${ACTIONS_RESSOURCES.HACKATHONS}-by-slug-${slug}`,
  },
};
