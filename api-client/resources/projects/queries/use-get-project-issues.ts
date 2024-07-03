import { useInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { getProjectIssues } from "api-client/resources/projects/fetch";
import { GetProjectIssuesPageResponse } from "api-client/resources/projects/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetProjectIssues = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getProjectIssues>) => {
  return useInfiniteQuery<GetProjectIssuesPageResponse>(
    useReactInfiniteQueryAdapter<GetProjectIssuesPageResponse>(getProjectIssues(fetch), options)
  );
};
