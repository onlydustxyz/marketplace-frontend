import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class ContributorProjectApplicationRefused implements NotificationInterface {
  data: components["schemas"]["NotificationContributorProjectApplicationRefused"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorProjectApplicationRefused;
  }

  getId() {
    return this.notification.id;
  }

  getTimestamp() {
    return this.notification.timestamp;
  }

  getStatus() {
    return this.notification.status;
  }

  hasRead() {
    return this.notification.status === NotificationStatus.READ;
  }

  getTitle() {
    return "Your application has been refused";
  }

  getDescription() {
    const { issueName } = this.data || {};
    return `Your application for ${issueName} has been refused`;
  }

  getUrl() {
    return NEXT_ROUTER.applications.all;
  }
}
