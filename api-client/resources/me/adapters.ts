import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { apiVersions } from "api-client/config/api-versions";
import tags from "api-client/resources/me/tags";
import { revalidateTag } from "next/cache";

import { hackathonsApiClient } from "../hackathons";
import { UpdateHackathonsRegistrationsParams } from "./types";

export default {
  root: () =>
    new FetchAdapter({
      version: apiVersions.v1,
      fetchFn: {
        url: "me",
        next: {
          tags: [tags.root],
        },
      },
    }),
  hackathonRegistrations: ({ hackathonId, hackathonSlug }: UpdateHackathonsRegistrationsParams) =>
    new FetchAdapter({
      version: apiVersions.v1,
      fetchFn: {
        url: `me/hackathons/${hackathonId}/registrations`,
        onSuccess: () => {
          revalidateTag(hackathonsApiClient.tags.by_slug(hackathonSlug));
        },
      },
    }),
};
