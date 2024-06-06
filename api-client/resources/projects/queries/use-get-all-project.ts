"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getAllProject } from "api-client/resources/projects/fetch";
import { GetAllProjectResponse, ProjectsPageQueryParams } from "api-client/resources/projects/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetAllProjects = (queryParams: ProjectsPageQueryParams, options?: ReactQueryOptions) => {
  const { query } = useReactQueryAdapter<GetAllProjectResponse>(getAllProject(queryParams), options);

  return useSuspenseQuery<GetAllProjectResponse>(query);
};
