import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/inputs/project-facade-port";
import { GetProjectBySlugResponse } from "core/domain/project/project-contract.types";

export function useGetProjectBySlug({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectBySlug"], GetProjectBySlugResponse>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter<GetProjectBySlugResponse>({
      ...projectStoragePort.getProjectBySlug({ pathParams, queryParams }),
      options,
    })
  );
}
