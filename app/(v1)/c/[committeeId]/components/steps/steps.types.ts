import { GetCommitteeProjectApplicationResponse } from "api-client/resources/committees/types";

export namespace TProjectApplicationSteps {
  export interface Props {
    status?: GetCommitteeProjectApplicationResponse["status"];
  }
}
