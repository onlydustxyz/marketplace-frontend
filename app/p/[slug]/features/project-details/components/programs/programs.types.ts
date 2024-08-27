import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TPrograms {
  export interface Props {
    programs?: UseGetProjectBySlugResponse["programs"];
  }
}
