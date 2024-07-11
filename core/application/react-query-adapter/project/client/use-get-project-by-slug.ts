import { useQuery } from "@tanstack/react-query";
import { useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { ReactQueryParameters } from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/inputs/project-facade.port";

export function useGetProjectBySlug({
  pathParams,
  queryParams,
  options,
}: ReactQueryParameters<ProjectFacadePort["getProjectBySlug"]>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(useQueryAdapter({ ...projectStoragePort.getProjectBySlug({ pathParams, queryParams }), options }));
}
