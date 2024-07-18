import { ListHackathon, ListHackathonInterface } from "core/domain/hackathon/models/list-hackathon-model";

import { components } from "src/__generated/api";

type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];

export interface HackathonInterface extends HackathonsDetailsResponse, ListHackathonInterface {
  // TODO @hayden get the back to sync this
  projects: HackathonsDetailsResponse["projects"];
}

export class Hackathon extends ListHackathon implements HackathonInterface {
  communityLinks!: HackathonsDetailsResponse["communityLinks"];
  description!: HackathonsDetailsResponse["description"];
  links!: HackathonsDetailsResponse["links"];
  me!: HackathonsDetailsResponse["me"];
  declare projects: HackathonsDetailsResponse["projects"];
  sponsors!: HackathonsDetailsResponse["sponsors"];
  totalBudget!: HackathonsDetailsResponse["totalBudget"];

  constructor(readonly props: HackathonsDetailsResponse) {
    super(props);
    Object.assign(this, props);
  }
}
