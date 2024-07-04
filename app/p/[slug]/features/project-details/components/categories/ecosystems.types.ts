import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TEcosystems {
  export interface Props {
    categories: UseGetProjectBySlugResponse["categories"];
  }
}
