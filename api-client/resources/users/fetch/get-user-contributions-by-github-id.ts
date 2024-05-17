import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/users/tags";
import { UserContributionsRequestParams, UserContributionsResponse } from "api-client/resources/users/types";

import adapters from "../adapters";

export function getUserContributionsByGithubId(
  githubId: number,
  params: UserContributionsRequestParams
): IFetchAdapater<UserContributionsResponse> {
  const fetcher = new FetchAdapter<UserContributionsResponse>(adapters.public_contributions)
    .setPathParams({ githubId })
    .setTag(tags.public_contributions(githubId, params?.languages?.join(), params?.ecosystems?.join()));

  if (params) {
    fetcher.setParams(params);
  }

  return fetcher;
}
