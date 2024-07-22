import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/inputs/project-facade-port";
import { GetProjectByIdResponse } from "core/domain/project/project-contract.types";

export function useGetProjectById({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectById"], GetProjectByIdResponse>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(useQueryAdapter({ ...projectStoragePort.getProjectById({ pathParams, queryParams }), options }));
}
