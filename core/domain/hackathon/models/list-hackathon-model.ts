import { bootstrap } from "core/bootstrap";
import { DateFacadePort } from "core/helpers/date/date-facade-port";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";
import process from "process";

import { components } from "src/__generated/api";

import { HackathonStatus } from "./hackathon.types";

type HackathonsListResponse = components["schemas"]["HackathonsListItemResponse"];

export interface ListHackathonInterface extends HackathonsListResponse {
  backgroundImage: string;
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
  formatDates(): {
    startDate: string;
    endDate: string;
    startTime: string;
  };
}

export class ListHackathon extends mapApiToClass<HackathonsListResponse>() implements ListHackathonInterface {
  backgroundImage!: string;
  dateHelper: DateFacadePort;

  constructor(protected props: HackathonsListResponse) {
    super(props);
    this.dateHelper = bootstrap.getDateHelperPort();
    this.setBackgroundImage();
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

  formatDates() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const formatInEuropeTimeZone = this.dateHelper.formatInEuropeTimeZone;

    return {
      startDate: formatInEuropeTimeZone(startDate, "MMMM dd, yyyy"),
      endDate: formatInEuropeTimeZone(endDate, "MMMM dd, yyyy"),
      startTime: formatInEuropeTimeZone(startDate, "hh:mm aa OOO"),
    };
  }

  private setBackgroundImage() {
    let backgroundIndex = this.index;

    const NB_AVAILABLE_BACKGROUNDS = 16;

    if (backgroundIndex >= NB_AVAILABLE_BACKGROUNDS) {
      backgroundIndex = backgroundIndex % NB_AVAILABLE_BACKGROUNDS;
    }

    this.backgroundImage = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/cover-${backgroundIndex + 1}.png`;
  }
}
