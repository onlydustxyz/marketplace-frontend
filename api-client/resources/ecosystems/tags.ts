import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.ecosystems}-root`,
  projects_by_slug: (slug: string) => `${apiResources.ecosystems}-projects-by-slug-${slug}`,
};
