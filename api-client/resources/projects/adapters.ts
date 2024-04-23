import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { apiVersions } from "api-client/config/api-versions";
import tags from "api-client/resources/hackathons/tags";

export default {
  root: () =>
    new FetchAdapter({
      version: apiVersions.v1,
      fetchFn: {
        url: "projects",
        next: {
          tags: [tags.root],
        },
      },
    }),
};
