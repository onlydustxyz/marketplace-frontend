import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TProjectDetails {
  export interface Props {
    project: UseGetProjectBySlugResponse;
  }
}
