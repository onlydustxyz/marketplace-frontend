import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TTags {
  export interface Props {
    tags: UseGetProjectBySlugResponse["tags"];
    className: string;
  }
}
