import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class ContributorProjectGoodFirstIssueCreated implements NotificationInterface {
  data: components["schemas"]["NotificationContributorProjectGoodFirstIssueCreated"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorProjectGoodFirstIssueCreated;
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
    return "Good first issue created";
  }

  getDescription() {
    const { issueName, projectName } = this.data || {};
    return `Good first issue ${issueName} created on project ${projectName}`;
  }

  getUrl() {
    return NEXT_ROUTER.projects.details.root(this.data!.projectSlug);
  }
}
