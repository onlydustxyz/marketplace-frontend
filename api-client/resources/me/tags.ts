import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.me}-root`,
  committee: (committeeId: string) => `${apiResources.me}-committees-${committeeId}`,
  committee_project: (committeeId: string, projectId: string) =>
    `${apiResources.me}-committees-${committeeId}-${projectId}`,
  recommended_projects: () => createTag(apiResources.me, "recommended-projects"),
};
