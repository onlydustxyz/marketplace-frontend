import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import tags from "api-client/resources/users/tags";
import { UserPublicEcosystemsResponse } from "api-client/resources/users/types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";

export function getUserPublicEcosystems({
  pathParams,
  pagination,
}: ParametersInterface<{
  PathParams: { githubId: number };
}>): IFetchAdapater<UserPublicEcosystemsResponse> {
  const fetcher = new FetchAdapter<UserPublicEcosystemsResponse>(adapters.public_ecosystems);

  if (pathParams) {
    fetcher.setPathParams({ githubId: pathParams.githubId }).setTag(tags.public_ecosystems(pathParams.githubId));
  }

  return PaginationAdapter(fetcher, pagination).fetcher;
}
