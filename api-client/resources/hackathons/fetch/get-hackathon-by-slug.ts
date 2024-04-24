import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/hackathons/tags";
import { GetHackathonDetailsReponse } from "api-client/resources/hackathons/types";

import adapters from "../adapters";

export function getHackathonBySlug(slug: string): IFetchAdapater<GetHackathonDetailsReponse> {
  return new FetchAdapter<GetHackathonDetailsReponse>(adapters.by_slug)
    .setPathParams({ slug })
    .setTag(tags.by_slug(slug));
}
