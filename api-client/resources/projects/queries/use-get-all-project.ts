"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";
import { getAllProjects } from "api-client/resources/projects/fetch";
import { GetProjectPageResponse, ProjectsGetAllQueryParams } from "api-client/resources/projects/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetAllProjects = ({
  queryParams,
  options,
  pagination,
}: {
  queryParams: ProjectsGetAllQueryParams;
  options?: ReactQueryOptions;
  pagination?: PaginationInterface;
}) => {
  const { query } = useReactQueryAdapter<GetProjectPageResponse>(getAllProjects(queryParams, pagination), options);

  return useSuspenseQuery<GetProjectPageResponse>(query);
};
