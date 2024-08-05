import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TProjectLeads {
  export interface Props {
    projectId: string;
    projectLeads: UseGetProjectBySlugResponse["leaders"];
    projectInvited: UseGetProjectBySlugResponse["invitedLeaders"];
  }
}
