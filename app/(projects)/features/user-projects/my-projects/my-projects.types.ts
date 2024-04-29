import { components } from "src/__generated/api";

export namespace TMyProjects {
  type Projects = components["schemas"]["ProjectLedShortResponse"][];

  export interface Props {
    projectsLead: Projects;
    pendingProjectsLead: Projects;
  }
}
