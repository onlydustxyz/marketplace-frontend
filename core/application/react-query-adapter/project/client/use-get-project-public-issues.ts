import { useInfiniteQuery } from "@tanstack/react-query";
import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/inputs/project-facade-port";
import { GetProjectIssuesModel } from "core/domain/project/project-contract.types";

export function useGetProjectPublicIssues({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectPublicIssues"], GetProjectIssuesModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectPublicIssues"], GetProjectIssuesModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectPublicIssues,
    })
  );
}
