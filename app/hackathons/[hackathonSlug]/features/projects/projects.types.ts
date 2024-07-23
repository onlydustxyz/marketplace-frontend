import { ProjectShortResponse } from "core/domain/project/models/short-project-model";

export namespace TProjects {
  export interface Props {
    projects: ProjectShortResponse[];
  }
}
