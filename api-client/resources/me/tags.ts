import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.me}-root`,
  committee: (committeeId: string) => `${apiResources.me}-committees-${committeeId}`,
};
