import { useCurrentUser } from "../use-current-user/use-current-user";
import { TUseProjectsLead } from "./use-projects-lead.types";

export const UseProjectsLead = (): TUseProjectsLead.Return => {
  const { user, isLoading } = useCurrentUser();

  return {
    projectsLead: user?.projectsLed?.length ? user.projectsLed : [],
    pendingProjectsLead: user?.pendingProjectsLed?.length ? user.pendingProjectsLed : [],
    isLoading,
  };
};
