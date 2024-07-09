"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { getAllProjectsCategories } from "../fetch/get-all-projects-categories";
import { GetProjectCategories } from "../types";

export const useGetProjectCategories = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getAllProjectsCategories>) => {
  const { query } = useReactQueryAdapter<GetProjectCategories>(getAllProjectsCategories(fetch), options);

  return useQuery<GetProjectCategories>(query);
};
