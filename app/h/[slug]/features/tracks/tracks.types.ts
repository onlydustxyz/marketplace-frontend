import { components } from "src/__generated/api";

export namespace TTracks {
  export interface Props {
    data: components["schemas"]["HackathonsTrackResponse"][];
  }
}
