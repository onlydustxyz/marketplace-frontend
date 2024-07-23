import { ProjectResponse } from "core/domain/project/models/project-model";

export namespace TProjectCategories {
  export interface Props {
    categories: ProjectResponse["categories"];
  }
}
