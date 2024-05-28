import { components } from "src/__generated/api";

export namespace TTrackProjects {
  export interface Props {
    projects: components["schemas"]["ProjectShortResponse"][];
  }
}
