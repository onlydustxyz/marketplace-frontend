import { components } from "src/__generated/api";

export namespace TMyProjects {
  export interface Props {
    projects: components["schemas"]["ProjectLedShortResponse"][];
  }
}
