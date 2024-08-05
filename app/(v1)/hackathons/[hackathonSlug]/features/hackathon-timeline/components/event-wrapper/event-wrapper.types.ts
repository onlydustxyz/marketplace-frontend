import { HackathonInterface } from "core/domain/hackathon/models/hackathon-model";

export namespace TEventWrapper {
  export interface Props {
    event: HackathonInterface["events"][0];
    index: number;
  }
}
