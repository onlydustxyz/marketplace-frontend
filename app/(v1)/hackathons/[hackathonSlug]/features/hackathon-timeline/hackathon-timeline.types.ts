import { HackathonInterface } from "core/domain/hackathon/models/hackathon-model";

export namespace THackathonTimeline {
  export interface Props {
    todayEvents: HackathonInterface["events"];
    previousEvents: HackathonInterface["events"];
    nextEvents: HackathonInterface["events"];
  }
}
