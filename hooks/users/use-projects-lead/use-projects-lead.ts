import { useCurrentUser } from "../use-current-user/use-current-user";
import { TUseProjectsLead } from "./use-projects-lead.types";

export const UseProjectsLead = (): TUseProjectsLead.Return => {
  const { user, isLoading } = useCurrentUser();

  if (user?.projectsLed?.length) {
    return {
      projects: user.projectsLed,
      isLoading,
    };
  }

  return {
    projects: [],
    isLoading,
  };
};
