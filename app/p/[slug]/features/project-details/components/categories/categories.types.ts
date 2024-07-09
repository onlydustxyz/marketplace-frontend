import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TCategories {
  export interface Props {
    categories: UseGetProjectBySlugResponse["categories"];
  }
}
