import { ShortProject } from "core/domain/project/models/short-project-model";

export namespace TProjects {
  export interface Props {
    projects: ShortProject[];
  }
}
