import { ProjectResponse } from "core/domain/project/models/project-model";

export namespace TProjectLanguages {
  export interface Props {
    languages: ProjectResponse["languages"];
  }
}
