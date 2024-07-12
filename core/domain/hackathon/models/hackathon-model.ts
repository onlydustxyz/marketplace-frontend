import { bootstrap } from "core/bootstrap";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];

type HackathonStatus = "live" | "open" | "closed";

interface HackathonInterface extends HackathonsDetailsResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
}

export class Hackathon extends mapApiToClass<HackathonsDetailsResponse>() implements HackathonInterface {
  constructor(readonly props: HackathonsDetailsResponse) {
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
