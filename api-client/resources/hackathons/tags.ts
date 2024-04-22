import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.hackathons}-root`,
  by_slug: (slug: string) => `${apiResources.hackathons}-by-slug-${slug}`,
};
