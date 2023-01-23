import jwtDecode from "jwt-decode";
import { useMemo } from "react";
import {
  AccessToken,
  CLAIMS_KEY,
  CustomUserRole,
  GITHUB_USERID_KEY,
  HasuraJWT,
  HasuraUserRole,
  PROJECTS_LED_KEY,
  UserRole,
} from "src/types";

const getProjectsLedFromJwt = (jwt: HasuraJWT): string[] => {
  const projectsLedRaw = jwt?.[CLAIMS_KEY]?.[PROJECTS_LED_KEY];
  if (!projectsLedRaw) return [];

  return JSON.parse(projectsLedRaw.replace("{", "[").replace("}", "]"));
};

function getRoleListFromJwt(jwtString?: AccessToken) {
  const newRoleList: UserRole[] = [HasuraUserRole.Public];
  if (!jwtString) return newRoleList;

  newRoleList.push(HasuraUserRole.RegisteredUser);

  try {
    const decodedToken = jwtDecode<HasuraJWT>(jwtString);
    const projectsLed = getProjectsLedFromJwt(decodedToken);
    if (projectsLed.length > 0) {
      newRoleList.push(CustomUserRole.ProjectLead);
    }
  } catch (e) {
    console.error(`Error decoding JWT: ${e}`);
  }

  return newRoleList;
}

function getGithubUserIdFromJwt(jwt: HasuraJWT) {
  const githubUserId = parseInt(jwt?.[CLAIMS_KEY]?.[GITHUB_USERID_KEY] || "");
  return isNaN(githubUserId) ? undefined : githubUserId;
}

export const useRoles = (accessToken?: AccessToken) => {
  const roles = useMemo(() => {
    return getRoleListFromJwt(accessToken);
  }, [accessToken]);

  const githubUserId = useMemo(() => {
    if (accessToken && roles.includes(HasuraUserRole.RegisteredUser)) {
      try {
        const decodedToken = jwtDecode<HasuraJWT>(accessToken);
        return getGithubUserIdFromJwt(decodedToken);
      } catch (e) {
        console.error(`Error decoding JWT: ${e}`);
      }
    }
  }, [accessToken]);

  const ledProjectIds = useMemo(() => {
    if (accessToken && roles.includes(CustomUserRole.ProjectLead)) {
      const decodedToken = jwtDecode<HasuraJWT>(accessToken);
      return getProjectsLedFromJwt(decodedToken);
    }
    return [];
  }, [roles]);

  const isLoggedIn = useMemo(() => {
    return !(roles.includes(HasuraUserRole.Public) && roles.length === 1);
  }, [roles]);

  return { roles, ledProjectIds, isLoggedIn, githubUserId };
};
