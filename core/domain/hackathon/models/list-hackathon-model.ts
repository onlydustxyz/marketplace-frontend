import { bootstrap } from "core/bootstrap";
import { DateFacadePort } from "core/helpers/date/date-facade-port";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

import { HackathonStatus } from "./hackathon.types";

type HackathonsListResponse = components["schemas"]["HackathonsListItemResponse"];

export interface ListHackathonInterface extends HackathonsListResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
  formatOpenGraphDate(): string;
}

export class ListHackathon extends mapApiToClass<HackathonsListResponse>() implements ListHackathonInterface {
  dateHelper: DateFacadePort;

  constructor(protected props: HackathonsListResponse) {
    super(props);
    this.dateHelper = bootstrap.getDateHelperPort();
  }

  isComingSoon() {
    return this.dateHelper.isFuture(new Date(this.startDate));
  }

  isLive() {
    return this.dateHelper.isPast(new Date(this.startDate)) && this.dateHelper.isFuture(new Date(this.endDate));
  }

  isPast() {
    return this.dateHelper.isPast(new Date(this.endDate));
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

  formatOpenGraphDate() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const format = this.dateHelper.format;

    const start = {
      day: format(startDate, "dd"),
      month: format(startDate, "MMMM"),
      year: format(startDate, "yyyy"),
    };

    const end = {
      day: format(endDate, "dd"),
      month: format(endDate, "MMMM"),
    };

    // March 18 - 24 2024
    // March 18 - April 24 2024
    // March 18 2024 - March 24 2025
    return `${start.month} ${start.day} - ${end.month} ${end.day} ${start.year}`;
  }
}
