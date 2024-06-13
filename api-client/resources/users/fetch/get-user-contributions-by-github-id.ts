import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import tags from "api-client/resources/users/tags";
import { UserContributionsRequestParams, UserContributionsResponse } from "api-client/resources/users/types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";

export function getUserContributionsByGithubId({
  pathParams,
  queryParams,
  pagination,
}: ParametersInterface<{
  PathParams: { githubId: number };
  QueryParams: UserContributionsRequestParams;
}>): IFetchAdapater<UserContributionsResponse> {
  const fetcher = new FetchAdapter<UserContributionsResponse>(adapters.public_contributions);

  if (pathParams) {
    fetcher
      .setPathParams({ githubId: pathParams.githubId })
      .setTag(
        tags.public_contributions(pathParams.githubId, queryParams?.languages?.join(), queryParams?.ecosystems?.join())
      );
  }

  if (queryParams) {
    fetcher.setParams(queryParams);
  }

  return PaginationAdapter(fetcher, pagination).fetcher;
}
