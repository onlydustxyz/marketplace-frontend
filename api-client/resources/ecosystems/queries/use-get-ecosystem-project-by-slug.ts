"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { ReactQueryOptions } from "api-client/types/react-query-options";

import { getEcosystemProjectBySlug } from "../fetch";
import { EcosystemProjectsPathParams, EcosystemProjectsQueryParams, GetEcosystemProjectPageResponse } from "../types";

export function useGetEcosystemProjectBySlug(
  pathParams: EcosystemProjectsPathParams,
  queryParams: EcosystemProjectsQueryParams,
  options?: ReactQueryOptions
) {
  const query = useReactInfiniteQueryAdapter<GetEcosystemProjectPageResponse>(
    getEcosystemProjectBySlug(pathParams, queryParams),
    { enabled: Boolean(pathParams.ecosystemSlug) && (options?.enabled ?? true), ...options }
  );

  return useInfiniteQuery<GetEcosystemProjectPageResponse>(query);
}
