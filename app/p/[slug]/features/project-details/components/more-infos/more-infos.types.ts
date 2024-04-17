import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TMoreInfos {
  export interface Props {
    moreInfos: UseGetProjectBySlugResponse["moreInfos"];
  }
}
