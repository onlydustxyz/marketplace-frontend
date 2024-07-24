import { HackathonEvent, HackathonEventInterface } from "core/domain/hackathon/models/hackathon-event-model";
import { HackathonList, HackathonListInterface } from "core/domain/hackathon/models/hackathon-list-model";

import { components } from "src/__generated/api";

type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];

export interface HackathonInterface extends HackathonsDetailsResponse, HackathonListInterface {
  // TODO @hayden get the back to sync this
  projects: HackathonsDetailsResponse["projects"];
  getTodayEvents(): HackathonEventInterface[];
  getPreviousEvents(): HackathonEventInterface[];
  getNextEvents(): HackathonEventInterface[];
  events: HackathonEventInterface[];
}

export class Hackathon extends HackathonList implements HackathonInterface {
  communityLinks!: HackathonsDetailsResponse["communityLinks"];
  description!: HackathonsDetailsResponse["description"];
  links!: HackathonsDetailsResponse["links"];
  me!: HackathonsDetailsResponse["me"];
  sponsors!: HackathonsDetailsResponse["sponsors"];
  totalBudget!: HackathonsDetailsResponse["totalBudget"];
  events!: HackathonEventInterface[];

  declare projects: HackathonsDetailsResponse["projects"];

  constructor(protected readonly props: HackathonsDetailsResponse) {
    super(props);
    Object.assign(this, props);

    this.events = this.sortEventsByDescStartDate([
      ...this.createDefaultHackathonEvents(props.startDate, props.endDate),
      ...props.events,
    ]).map(event => new HackathonEvent(event));
  }

  private createDefaultHackathonEvents(start: string, end: string): HackathonsDetailsResponse["events"] {
    return [
      {
        name: "ODHack begins",
        iconSlug: "ri-calendar-line",
        subtitle: "Get ready to start contributing, connecting & receiving rewards!",
        startDate: start,
        endDate: this.dateHelper.addMinutes(new Date(start), 10).toISOString(),
        links: [],
      },
      {
        name: "ODHack finishes",
        iconSlug: "ri-calendar-line",
        subtitle: "All tasks should have been completed, now maintainers will review final work.",
        startDate: end,
        endDate: this.dateHelper.addMinutes(new Date(end), 10).toISOString(),
        links: [],
      },
    ];
  }

  private sortEventsByDescStartDate(events: HackathonsDetailsResponse["events"]): HackathonsDetailsResponse["events"] {
    return events.sort((a, b) => this.dateHelper.compareDesc(new Date(a.startDate), new Date(b.startDate)));
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
