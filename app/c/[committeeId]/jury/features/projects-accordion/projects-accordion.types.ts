import { CommitteeAssignmentResponse } from "api-client/resources/me/types";

export namespace TProjectAccordion {
  export interface Props {
    projectAssignments: CommitteeAssignmentResponse[];
  }
}
