import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TEmptyState {
  export interface Props {
    organizations: UseGetProjectBySlugResponse["organizations"];
    isProjectLeader: boolean;
  }
}
