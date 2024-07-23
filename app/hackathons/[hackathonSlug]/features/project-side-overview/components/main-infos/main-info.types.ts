import { ProjectResponse } from "core/domain/project/models/project-model";

export namespace TMainInfo {
  export interface Link {
    url: string;
    value?: string;
  }

  export interface Props {
    project: ProjectResponse;
  }
}
