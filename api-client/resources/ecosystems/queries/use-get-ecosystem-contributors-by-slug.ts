"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getEcosystemContributorsBySlug } from "api-client/resources/ecosystems/fetch/get-ecosystem-contributors-by-slug";
import { ReactQueryOptions } from "api-client/types/react-query-options";

import {
  EcosystemContributorsPathParams,
  EcosystemContributorsQueryParams,
  GetEcosystemContributorsPageResponse,
} from "../types";

export function useGetEcosystemContributorsBySlug(
  pathParams: EcosystemContributorsPathParams,
  queryParams: EcosystemContributorsQueryParams,
  options?: ReactQueryOptions
) {
  const query = useReactInfiniteQueryAdapter<GetEcosystemContributorsPageResponse>(
    getEcosystemContributorsBySlug(pathParams, queryParams),
    { enabled: Boolean(pathParams.ecosystemSlug) && (options?.enabled ?? true), ...options }
  );

  return useInfiniteQuery<GetEcosystemContributorsPageResponse>(query);
}
