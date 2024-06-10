"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getAllProjects } from "api-client/resources/projects/fetch";
import { GetProjectPageResponse } from "api-client/resources/projects/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useInfiniteGetAllProject = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getAllProjects>) => {
  return useSuspenseInfiniteQuery<GetProjectPageResponse>(
    useReactInfiniteQueryAdapter<GetProjectPageResponse>(getAllProjects(fetch), options)
  );
};
