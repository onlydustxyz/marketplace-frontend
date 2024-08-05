import { components } from "src/__generated/api";

export namespace TProjectCard {
  export interface Props {
    project: components["schemas"]["ProjectPageItemResponse"];
    isFirstHiringProject?: boolean;
    isUserProjectLead?: boolean;
  }
}
