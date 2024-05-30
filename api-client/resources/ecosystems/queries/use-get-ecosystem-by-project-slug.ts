"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { ReactQueryOptions } from "api-client/types/react-query-options";

import { getEcosystemByProjectSlug } from "../fetch";
import { EcosystemProjectPathParams, EcosystemProjectQueryParams, GetEcosystemProjectPageResponse } from "../types";

export function useGetEcosystemByProjectSlug(
  pathParams: EcosystemProjectPathParams,
  queryParams: EcosystemProjectQueryParams,
  options?: ReactQueryOptions
) {
  const query = useReactInfiniteQueryAdapter<GetEcosystemProjectPageResponse>(
    getEcosystemByProjectSlug(pathParams, queryParams)
  );

  return useInfiniteQuery<GetEcosystemProjectPageResponse>({
    ...query,
    enabled: Boolean(pathParams.ecosystemSlug) && (options?.enabled ?? true),
    ...options,
  });
}
