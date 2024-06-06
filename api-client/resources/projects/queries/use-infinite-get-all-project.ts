"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getAllProject } from "api-client/resources/projects/fetch";
import { GetAllProjectResponse, ProjectsPageQueryParams } from "api-client/resources/projects/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useInfiniteGetAllProject = (queryParams: ProjectsPageQueryParams, options?: ReactQueryOptions) => {
  const query = useReactInfiniteQueryAdapter<GetAllProjectResponse>(getAllProject(queryParams), options);

  return useInfiniteQuery<GetAllProjectResponse>(query);
};
