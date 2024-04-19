import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TTechnologies {
  export interface Props {
    technologies: UseGetProjectBySlugResponse["technologies"];
  }
}
