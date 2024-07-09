import { useQuery } from "@tanstack/react-query";
import { GetProjectBySlugResponse } from "api-client/resources/projects/types";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/ports/input/project-facade.port";

export function useGetProjectBySlug({ pathParams, queryParams }: Parameters<ProjectFacadePort["getProjectBySlug"]>[0]) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery<GetProjectBySlugResponse>({
    queryFn: () => projectStoragePort.getProjectBySlug({ pathParams, queryParams }),
    queryKey: ["getProjectBySlug", pathParams?.slug],
  });
}
