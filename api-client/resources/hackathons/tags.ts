import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.hackathons}-root`,
  details: `${apiResources.hackathons}-details`,
  by_slug: (slug: string) => `${apiResources.hackathons}-by-slug-${slug}`,
};
