"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getAllProjectsCategories } from "api-client/resources/projects/fetch/get-all-projects-categories";
import { GetProjectCategories } from "api-client/resources/projects/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetProjectCategories = ({
  options,
}: ParametersInterfaceWithReactQuery<typeof getAllProjectsCategories>) => {
  const { query } = useReactQueryAdapter<GetProjectCategories>(getAllProjectsCategories(), options);

  return useQuery<GetProjectCategories>(query);
};
