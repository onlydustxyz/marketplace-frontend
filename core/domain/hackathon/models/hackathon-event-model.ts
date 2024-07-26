import { bootstrap } from "core/bootstrap";
import { HackathonEventStatus } from "core/domain/hackathon/models/hackathon.types";

import { components } from "src/__generated/api";

type HackathonsEventsResponse = components["schemas"]["HackathonsEventItemResponse"];

export interface HackathonEventInterface extends HackathonsEventsResponse {
  isToday(): boolean;
  isAfterToday(): boolean;
  isBeforeToday(): boolean;
  isLive(): boolean;
  getFormattedTzTime(): string;
  getStatus(): HackathonEventStatus;
}

export class HackathonEvent implements HackathonEventInterface {
  endDate!: HackathonsEventsResponse["endDate"];
  iconSlug!: HackathonsEventsResponse["iconSlug"];
  links!: HackathonsEventsResponse["links"];
  name!: HackathonsEventsResponse["name"];
  startDate!: HackathonsEventsResponse["startDate"];
  subtitle!: HackathonsEventsResponse["subtitle"];

  constructor(props: HackathonsEventsResponse) {
    Object.assign(this, props);
  }

  protected dateHelper = bootstrap.getDateHelperPort();

  isToday(): boolean {
    const eachDays = this.dateHelper.eachDayOfInterval(new Date(this.startDate), new Date(this.endDate));

    return eachDays.some(day => this.dateHelper.isToday(day));
  }

  isAfterToday(): boolean {
    return !this.isToday() && this.dateHelper.isFuture(new Date(this.startDate));
  }

  isBeforeToday(): boolean {
    return !this.isToday() && this.dateHelper.isPast(new Date(this.endDate));
  }

  isLive(): boolean {
    return this.dateHelper.isPast(new Date(this.startDate)) && this.dateHelper.isFuture(new Date(this.endDate));
  }

  getFormattedTzTime(): string {
    return this.dateHelper.formatInEuropeTimeZone(new Date(this.startDate), "hh aa OOO");
  }

  getStatus() {
    if (this.isLive()) {
      return "highlight";
    }

    if (this.dateHelper.isPast(new Date(this.endDate))) {
      return "terminated";
    }

    return "planned";
  }
}
