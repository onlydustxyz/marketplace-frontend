import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TProjectHeader {
  export interface Props {
    isProjectLeader: boolean;
    hasOrgsWithUnauthorizedRepos: boolean;
    project: UseGetProjectBySlugResponse;
  }
}
