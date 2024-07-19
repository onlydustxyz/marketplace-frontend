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
  events!: HackathonsDetailsResponse["events"];

  constructor(protected readonly props: HackathonsDetailsResponse) {
    super(props);
    Object.assign(this, props);
    this.events = [
      {
        name: "PAST EVENT 1",
        subtitle: "Lorem ipsum",
        iconSlug: "ri-rocket-line",
        startDate: "2024-07-17T12:18:00.705Z",
        endDate: "2024-07-17T17:28:00.705Z",
        links: [
          {
            url: "string",
            value: "string",
          },
        ],
      },
      {
        name: "PAST EVENT 2",
        subtitle: "Lorem ipsum",
        iconSlug: "ri-rocket-line",
        startDate: "2024-07-18T18:18:00.705Z",
        endDate: "2024-07-18T22:28:00.705Z",
        links: [
          {
            url: "string",
            value: "string",
          },
        ],
      },
      {
        name: "TODAY EVENT 1",
        subtitle: "Lorem ipsum",
        iconSlug: "ri-rocket-line",
        startDate: "2024-07-19T12:18:00.705Z",
        endDate: "2024-07-19T17:28:00.705Z",
        links: [
          {
            url: "string",
            value: "string",
          },
        ],
      },
      {
        name: "TODAY EVENT 2",
        subtitle: "Lorem ipsum",
        iconSlug: "ri-rocket-line",
        startDate: "2024-07-19T18:18:00.705Z",
        endDate: "2024-07-19T22:28:00.705Z",
        links: [
          {
            url: "string",
            value: "string",
          },
        ],
      },
      {
        name: "FUTURE EVENT 1",
        subtitle: "Lorem ipsum",
        iconSlug: "ri-rocket-line",
        startDate: "2024-07-21T12:18:00.705Z",
        endDate: "2024-07-21T17:28:00.705Z",
        links: [
          {
            url: "string",
            value: "string",
          },
        ],
      },
      {
        name: "FUTURE EVENT 2",
        subtitle: "Lorem ipsum",
        iconSlug: "ri-rocket-line",
        startDate: "2024-07-22T18:18:00.705Z",
        endDate: "2024-07-22T22:28:00.705Z",
        links: [
          {
            url: "string",
            value: "string",
          },
        ],
      },
    ];
  }
}
