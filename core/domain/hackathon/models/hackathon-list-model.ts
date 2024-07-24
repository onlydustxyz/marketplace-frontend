import { bootstrap } from "core/bootstrap";
import { DateFacadePort } from "core/helpers/date/date-facade-port";
import process from "process";

import { components } from "src/__generated/api";

import { HackathonStatus } from "./hackathon.types";

type HackathonsListResponse = components["schemas"]["HackathonsListItemResponse"];

export interface HackathonListInterface extends HackathonsListResponse {
  backgroundImage: string;
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
  formatDisplayDates(): {
    startDate: string;
    endDate: string;
    startTime: string;
  };
}

export class HackathonList implements HackathonListInterface {
  endDate!: HackathonsListResponse["endDate"];
  id!: HackathonsListResponse["id"];
  index!: HackathonsListResponse["index"];
  issueCount!: HackathonsListResponse["issueCount"];
  location!: HackathonsListResponse["location"];
  openIssueCount!: HackathonsListResponse["openIssueCount"];
  projects!: HackathonsListResponse["projects"];
  slug!: HackathonsListResponse["slug"];
  startDate!: HackathonsListResponse["startDate"];
  subscriberCount!: HackathonsListResponse["subscriberCount"];
  title!: HackathonsListResponse["title"];
  backgroundImage!: string;
  dateHelper: DateFacadePort;

  constructor(props: HackathonsListResponse) {
    Object.assign(this, props);

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

  formatDisplayDates() {
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
