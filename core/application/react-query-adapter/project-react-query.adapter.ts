import { useQuery } from "@tanstack/react-query";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/ports/input/project-facade.port";
import { GetProjectBySlugResponse } from "core/domain/types/project.types";

export function useGetProjectBySlug({ pathParams, queryParams }: Parameters<ProjectFacadePort["getProjectBySlug"]>[0]) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery<GetProjectBySlugResponse>({
    queryFn: () => projectStoragePort.getProjectBySlug({ pathParams, queryParams }),
    queryKey: ["getProjectBySlug", pathParams?.slug],
  });
}
