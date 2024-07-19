import { useQuery } from "@tanstack/react-query";
import { useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { ReactQueryParameters } from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/inputs/project-facade-port";

export function useGetProjectById({
  pathParams,
  queryParams,
  options,
}: ReactQueryParameters<ProjectFacadePort["getProjectById"]>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(useQueryAdapter({ ...projectStoragePort.getProjectById({ pathParams, queryParams }), options }));
}
