import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";
import tags from "api-client/resources/users/tags";
import { UserPublicLanguagesResponse } from "api-client/resources/users/types";

import adapters from "../adapters";

export function getUserPublicLanguages(
  githubId: number,
  pagination?: PaginationInterface
): IFetchAdapater<UserPublicLanguagesResponse> {
  const fetcher = new FetchAdapter<UserPublicLanguagesResponse>(adapters.public_languages)
    .setPathParams({ githubId })
    .setTag(tags.public_languages(githubId));

  return PaginationAdapter(fetcher, pagination).fetcher;
}
