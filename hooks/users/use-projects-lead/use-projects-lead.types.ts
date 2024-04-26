import { components } from "src/__generated/api";

export namespace TUseProjectsLead {
  export interface Return {
    projects: components["schemas"]["ProjectLedShortResponse"][];
    isLoading: boolean;
  }
}
