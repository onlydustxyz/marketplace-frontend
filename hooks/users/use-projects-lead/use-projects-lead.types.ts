import { components } from "src/__generated/api";

export namespace TUseProjectsLead {
  type Projects = components["schemas"]["ProjectLedShortResponse"][];

  export interface Return {
    projectsLead: Projects;
    pendingProjectsLead: Projects;
    isLoading: boolean;
  }
}
