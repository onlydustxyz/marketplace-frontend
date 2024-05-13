import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";
import tags from "api-client/resources/users/tags";
import { UserPublicEcosystemsResponse } from "api-client/resources/users/types";

import adapters from "../adapters";

export function getUserPublicEcosystems(
  githubId: number,
  pagination?: PaginationInterface
): IFetchAdapater<UserPublicEcosystemsResponse> {
  const fetcher = new FetchAdapter<UserPublicEcosystemsResponse>(adapters.public_ecosystems)
    .setPathParams({ githubId })
    .setTag(tags.public_ecosystems(githubId));

  return PaginationAdapter(fetcher, pagination).fetcher;
}
