import { components } from "src/__generated/api";

export namespace TMyProjects {
  type Projects = components["schemas"]["ProjectLinkResponse"][];

  export interface Props {
    projectsLead: Projects;
    pendingProjectsLead: Projects;
  }
}
