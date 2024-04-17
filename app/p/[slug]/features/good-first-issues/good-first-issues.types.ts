import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TGoodFirstIssues {
  export interface Props {
    projectId: string;
    organizations: UseGetProjectBySlugResponse["organizations"];
    isProjectLeader: boolean;
  }
}
