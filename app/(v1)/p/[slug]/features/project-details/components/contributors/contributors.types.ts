import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TContributors {
  export interface Props {
    contributorCount: number;
    topContributors: UseGetProjectBySlugResponse["topContributors"];
  }
}
