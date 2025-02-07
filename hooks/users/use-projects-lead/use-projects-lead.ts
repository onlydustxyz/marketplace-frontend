import { useCurrentUser } from "../use-current-user/use-current-user";
import { TUseProjectsLead } from "./use-projects-lead.types";

export const useProjectsLead = (): TUseProjectsLead.Return => {
  const { user, ...restQuery } = useCurrentUser();

  return {
    projectsLead: user?.projectsLed?.length ? user.projectsLed : [],
    pendingProjectsLead: [],
    ...restQuery,
  };
};
