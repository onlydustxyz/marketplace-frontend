import { bootstrap } from "core/bootstrap";
import process from "process";

import { components } from "src/__generated/api";

import { HackathonStatus } from "./hackathon.types";

type HackathonsListResponse = components["schemas"]["HackathonsListItemResponse"];

export interface HackathonListInterface extends HackathonsListResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
  formatDisplayDates(): {
    startDate: string;
    endDate: string;
    startTime: string;
  };
  getBackgroundImage(): string;
}

export class HackathonList implements HackathonListInterface {
  endDate!: HackathonsListResponse["endDate"];
  githubLabels!: HackathonsListResponse["githubLabels"];
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

  constructor(props: HackathonsListResponse) {
    Object.assign(this, props);
  }

  protected dateHelper = bootstrap.getDateHelperPort();

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

  getBackgroundImage() {
    const NB_AVAILABLE_BACKGROUNDS = 16;

    let backgroundIndex = this.index;

    if (backgroundIndex >= NB_AVAILABLE_BACKGROUNDS) {
      backgroundIndex = backgroundIndex % NB_AVAILABLE_BACKGROUNDS;
    }

    return `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/cover-${backgroundIndex + 1}.png`;
  }
}
