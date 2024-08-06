import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class ContributorProjectApplicationAccepted implements NotificationInterface {
  data: components["schemas"]["NotificationContributorProjectApplicationAccepted"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorProjectApplicationAccepted;
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
    return "You application has been accepted";
  }

  getDescription() {
    const { issueName } = this.data || {};
    return `You application for ${issueName} has been accepted`;
  }

  getUrl() {
    return NEXT_ROUTER.applications.all;
  }
}
