import { GetProjectBySlugResponse } from "core/domain/project/project-contract.types";

export namespace TStayTuned {
  export interface Props {
    projectId: string;
    moreInfo: GetProjectBySlugResponse["moreInfos"];
  }
}
