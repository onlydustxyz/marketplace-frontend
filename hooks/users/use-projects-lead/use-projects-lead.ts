import { useCurrentUser } from "../use-current-user/use-current-user";
import { TUseProjectsLead } from "./use-projects-lead.types";

export const UseProjectsLead = (): TUseProjectsLead.Return => {
  const { user, isLoading } = useCurrentUser();

  return {
    projects: user?.projectsLed?.length ? user.projectsLed : [],
    isLoading,
  };
};
