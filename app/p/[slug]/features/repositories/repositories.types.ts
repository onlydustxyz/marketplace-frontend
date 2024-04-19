import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TRepositories {
  export interface Props {
    organizations: UseGetProjectBySlugResponse["organizations"];
  }
}
