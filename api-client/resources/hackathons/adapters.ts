import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { apiVersions } from "api-client/config/api-versions";
import tags from "api-client/resources/hackathons/tags";

export default {
  root: () =>
    new FetchAdapter({
      version: apiVersions.v1,
      fetchFn: {
        url: "hackathons",
        next: {
          tags: [tags.root],
        },
      },
    }),
  by_slug: (slug: string) =>
    new FetchAdapter({
      version: apiVersions.v1,
      fetchFn: {
        url: `hackathons/slug/${slug}`,
        next: {
          tags: [tags.by_slug(slug)],
        },
      },
    }),
};
