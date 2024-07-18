import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteQueryAdapter } from "core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { ReactQueryInfiniteParameters } from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/inputs/project-facade-port";
import { GetProjectIssuesResponse } from "core/domain/project/project.types";

export function useGetProjectPublicIssues({
  pathParams,
  queryParams,
  options,
}: ReactQueryInfiniteParameters<ProjectFacadePort["getProjectPublicIssues"]>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<GetProjectIssuesResponse>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectPublicIssues,
    })
  );
}
