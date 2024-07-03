import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import tags from "api-client/resources/users/tags";
import { UserPublicLanguagesResponse } from "api-client/resources/users/types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";

export function getUserPublicLanguages({
  pathParams,
  pagination,
}: ParametersInterface<{
  PathParams: { githubId: number };
}>): IFetchAdapater<UserPublicLanguagesResponse> {
  const fetcher = new FetchAdapter<UserPublicLanguagesResponse>(adapters.public_languages);

  if (pathParams) {
    fetcher.setPathParams({ githubId: pathParams.githubId }).setTag(tags.public_languages(pathParams.githubId));
  }

  return PaginationAdapter(fetcher, pagination).fetcher;
}
