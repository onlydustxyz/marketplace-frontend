import { HackathonEvent, HackathonEventInterface } from "core/domain/hackathon/models/hackathon-event-model";
import { ListHackathon, ListHackathonInterface } from "core/domain/hackathon/models/list-hackathon-model";

import { components } from "src/__generated/api";

type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];

export interface HackathonInterface extends HackathonsDetailsResponse, ListHackathonInterface {
  // TODO @hayden get the back to sync this
  projects: HackathonsDetailsResponse["projects"];
  getTodayEvents(): HackathonEventInterface[];
  getPreviousEvents(): HackathonEventInterface[];
  getNextEvents(): HackathonEventInterface[];
  events: HackathonEventInterface[];
}

export class Hackathon extends ListHackathon implements HackathonInterface {
  communityLinks!: HackathonsDetailsResponse["communityLinks"];
  description!: HackathonsDetailsResponse["description"];
  links!: HackathonsDetailsResponse["links"];
  me!: HackathonsDetailsResponse["me"];
  declare projects: HackathonsDetailsResponse["projects"];
  sponsors!: HackathonsDetailsResponse["sponsors"];
  totalBudget!: HackathonsDetailsResponse["totalBudget"];
  events!: HackathonEventInterface[];

  constructor(protected readonly props: HackathonsDetailsResponse) {
    const propsWithEvents = {
      ...props,
      events: props.events.map(event => new HackathonEvent(event)),
    };

    super(propsWithEvents);
    Object.assign(this, propsWithEvents);
  }

  getTodayEvents() {
    return this.events.filter(event => event.isToday());
  }

  getPreviousEvents() {
    return this.events.filter(event => event.isBeforeToday());
  }

  getNextEvents() {
    return this.events.filter(event => event.isAfterToday());
  }
}
