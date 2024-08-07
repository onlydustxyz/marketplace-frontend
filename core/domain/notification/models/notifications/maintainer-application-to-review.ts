import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class MaintainerApplicationToReview implements NotificationInterface {
  data: components["schemas"]["NotificationMaintainerApplicationToReview"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.maintainerApplicationToReview;
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
    return "New application";
  }

  getDescription() {
    const { projectName, applicationLogin, issueName } = this.data || {};
    return `${applicationLogin} applied to ${issueName} on ${projectName}`;
  }

  getUrl() {
    const { projectSlug } = this.data || {};
    if (projectSlug) {
      return NEXT_ROUTER.projects.details.applications.root(projectSlug);
    }
    return undefined;
  }
}
