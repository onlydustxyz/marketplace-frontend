import { bootstrap } from "core/bootstrap";
import { HackathonEvent, HackathonEventInterface } from "core/domain/hackathon/models/hackathon-event-model";
import { ListHackathon, ListHackathonInterface } from "core/domain/hackathon/models/list-hackathon-model";
import { DateFacadePort } from "core/helpers/date/date-facade-port";

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
  sponsors!: HackathonsDetailsResponse["sponsors"];
  totalBudget!: HackathonsDetailsResponse["totalBudget"];
  events!: HackathonEventInterface[];

  declare projects: HackathonsDetailsResponse["projects"];
  private dateHelper: DateFacadePort;

  constructor(protected readonly props: HackathonsDetailsResponse) {
    super(props);
    Object.assign(this, props);
    this.dateHelper = bootstrap.getDateHelperPort();

    this.events = this.sortEventsByStartDate([
      ...this.createDefaultHackathonEvents(props.startDate, props.endDate),
      ...props.events,
    ]).map(event => new HackathonEvent(event));
  }

  private createDefaultHackathonEvents(start: string, end: string): HackathonsDetailsResponse["events"] {
    return [
      {
        name: "start hackathon",
        iconSlug: "ri-calendar-line",
        subtitle: "",
        startDate: start,
        endDate: this.dateHelper.addMinutes(new Date(start), 10).toISOString(),
        links: [],
      },
      {
        name: "end hackathon",
        iconSlug: "ri-calendar-line",
        subtitle: "",
        startDate: end,
        endDate: this.dateHelper.addMinutes(new Date(end), 10).toISOString(),
        links: [],
      },
    ];
  }

  private sortEventsByStartDate(events: HackathonsDetailsResponse["events"]): HackathonsDetailsResponse["events"] {
    return events.sort((a, b) => this.dateHelper.compareAsc(new Date(a.startDate), new Date(b.startDate)));
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
