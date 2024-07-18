import { bootstrap } from "core/bootstrap";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

import { HackathonStatus } from "./hackathon.types";

type HackathonsListResponse = components["schemas"]["HackathonsListItemResponse"];

export interface ListHackathonInterface extends HackathonsListResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
}

export class ListHackathon extends mapApiToClass<HackathonsListResponse>() implements ListHackathonInterface {
  constructor(readonly props: HackathonsListResponse) {
    super(props);
  }

  isComingSoon() {
    return bootstrap.getDateHelperPort().isFuture(new Date(this.startDate));
  }

  isLive() {
    return (
      bootstrap.getDateHelperPort().isPast(new Date(this.startDate)) &&
      bootstrap.getDateHelperPort().isFuture(new Date(this.endDate))
    );
  }

  isPast() {
    return bootstrap.getDateHelperPort().isPast(new Date(this.endDate));
  }

  getStatus() {
    if (this.isLive()) {
      return "live";
    }

    if (this.isComingSoon()) {
      return "open";
    }

    return "closed";
  }
}
