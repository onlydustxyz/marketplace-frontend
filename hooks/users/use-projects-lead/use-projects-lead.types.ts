import { components } from "src/__generated/api";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export namespace TUseProjectsLead {
  type Projects = components["schemas"]["ProjectLinkResponse"][];

  export interface Return extends ReturnType<typeof useCurrentUser> {
    projectsLead: Projects;
    pendingProjectsLead: Projects;
  }
}
