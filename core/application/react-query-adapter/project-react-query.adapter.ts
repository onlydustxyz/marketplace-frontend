import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInfiniteQueryAdapter } from "core/application/react-query-adapter/infinite-query-adapter";
import { useQueryAdapter } from "core/application/react-query-adapter/query-adapters";
import {
  ReactQueryInfiniteParameters,
  ReactQueryParameters,
} from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/inputs/project-facade.port";

function useGetProjectBySlug({
  pathParams,
  queryParams,
  options,
}: ReactQueryParameters<ProjectFacadePort["getProjectBySlug"]>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(useQueryAdapter({ ...projectStoragePort.getProjectBySlug({ pathParams, queryParams }), options }));
}

function useGetProjectRewards({
  pathParams,
  queryParams,
  options,
}: ReactQueryInfiniteParameters<ProjectFacadePort["getProjectRewards"]>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter({
      pathParams,
      queryParams,
      options,
      initFn: projectStoragePort.getProjectRewards,
    })
  );
}

export const ProjectReactQueryAdapter = {
  useGetProjectBySlug,
  useGetProjectRewards,
};
