import { apiClientConfig } from "api-client/config";

export default {
  root: apiClientConfig.basePaths.V1("hackathons"),
  by_slug: (slug: string) => apiClientConfig.basePaths.V1(`hackathons/slug/${slug}`),
};
