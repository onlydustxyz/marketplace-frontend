"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getAllProjects } from "api-client/resources/projects/fetch";
import { GetProjectPageResponse, ProjectsGetAllQueryParams } from "api-client/resources/projects/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useInfiniteGetAllProject = ({
  queryParams,
  options,
}: {
  queryParams: ProjectsGetAllQueryParams;
  options?: ReactQueryOptions;
}) => {
  const query = useReactInfiniteQueryAdapter<GetProjectPageResponse>(getAllProjects(queryParams), options);

  return useSuspenseInfiniteQuery<GetProjectPageResponse>(query);
};
