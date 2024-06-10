import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.me}-root`,
  committee: (committeeId: string) => `${apiResources.me}-committees-${committeeId}`,
  committeeProject: (committeeId: string, projectId: string) =>
    `${apiResources.me}-committees-${committeeId}-${projectId}`,
  myRewards: `${apiResources.me}-my-rewards`,
};
