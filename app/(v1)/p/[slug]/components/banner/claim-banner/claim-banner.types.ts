import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TClaimBanner {
  export interface Props {
    project: UseGetProjectBySlugResponse;
  }
}
