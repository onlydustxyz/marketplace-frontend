import { useQuery } from "@tanstack/react-query";
import { bootstrap } from "core/bootstrap";
import { ProjectFacadePort } from "core/domain/project/input/project-facade.port";
import { GetProjectBySlugResponse } from "core/domain/project/project.types";

function useGetProjectBySlug({ pathParams, queryParams }: Parameters<ProjectFacadePort["getProjectBySlug"]>[0]) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  const { request: queryFn, tag } = projectStoragePort.getProjectBySlug({ pathParams, queryParams });

  return useQuery<GetProjectBySlugResponse>({
    queryFn,
    queryKey: [tag],
  });
}

export const ProjectReactQueryAdapter = {
  useGetProjectBySlug,
};

// 1ere connexion
// const authProvider = useAuthProvider();
// bootstrap.setAuthProvider(authProvider);
//
// function useAuthProvider(): AuthProvider {
//   const { isAuthenticated, getAccessTokenSilently: getAccessToken, logout } = useAuth0();
//
//   return new (class implements AuthProvider {
//     isAuthenticated = isAuthenticated;
//     getAccessToken = getAccessToken;
//     logout = logout;
//   })();
// }
