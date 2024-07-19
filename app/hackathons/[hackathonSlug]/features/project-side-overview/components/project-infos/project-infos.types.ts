import { ProjectResponse } from "core/domain/project/models/project-model";

export namespace TProjectInfos {
  export interface Sponsor {
    id: string;
    name: string;
    url?: string | null;
    logoUrl: string;
  }
  export interface Props {
    project: ProjectResponse;
  }
}
