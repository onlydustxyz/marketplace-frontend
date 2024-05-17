import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/users/tags";
import { UserPublicStatsResponse } from "api-client/resources/users/types";

import adapters from "../adapters";

export function getUserPublicStats(githubId: number, ecosystemId?: string): IFetchAdapater<UserPublicStatsResponse> {
  const fetcher = new FetchAdapter<UserPublicStatsResponse>(adapters.public_stats)
    .setPathParams({ githubId })
    .setTag(tags.public_stats(githubId, ecosystemId));

  if (ecosystemId) {
    fetcher.setParams({ ecosystem: ecosystemId });
  }

  return fetcher;
}
