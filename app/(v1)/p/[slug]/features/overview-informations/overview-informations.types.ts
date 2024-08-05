import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TOverviewInformations {
  export interface Props {
    project: UseGetProjectBySlugResponse;
  }
}
