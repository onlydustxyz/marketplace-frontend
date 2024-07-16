import { components } from "src/__generated/api";

export namespace TProjects {
  type Project = components["schemas"]["ProjectShortResponse"];

  export interface Props {
    projects: Project[];
  }
}
