import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { CLAIMS_KEY, CustomUserRole, HasuraJWT, HasuraUserRole, PROJECTS_LED_KEY, UserRole } from "src/types";

const getProjectsLedFromJwt = (jwt: HasuraJWT): string[] => {
  const projectsLedRaw = jwt?.[CLAIMS_KEY]?.[PROJECTS_LED_KEY];
  if (!projectsLedRaw) return [];

  return JSON.parse(projectsLedRaw.replace("{", "[").replace("}", "]"));
};

function getRoleListFromJwt(jwtString?: string) {
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

export const useJwtRole = (jwtString?: string) => {
  const [roleList, setRoleList] = useState<UserRole[]>(getRoleListFromJwt(jwtString));
  const [ledProjectIds, setLedProjectIds] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => setRoleList(getRoleListFromJwt(jwtString)), [jwtString]);

  useEffect(() => {
    if (jwtString && roleList.includes(CustomUserRole.ProjectLead)) {
      const decodedToken = jwtDecode<HasuraJWT>(jwtString);
      const projectsLed = getProjectsLedFromJwt(decodedToken);
      if (projectsLed.length > 0) {
        setLedProjectIds(projectsLed);
      }
    }
  }, [JSON.stringify(roleList)]);

  useEffect(() => {
    setIsLoggedIn(!(roleList.includes(HasuraUserRole.Public) && roleList.length === 1));
  }, [JSON.stringify(roleList)]);

  return { roleList, ledProjectIds, isLoggedIn };
};
