import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class MaintainerApplicationToReview implements NotificationInterface {
  constructor(private notification: Notification) {}

  getId() {
    return this.notification.id;
  }

  getTimestamp() {
    return this.notification.timestamp;
  }

  isRead() {
    return this.notification.status === "READ";
  }

  getTitle() {
    return "New application";
  }

  getDescription() {
    const project = this.notification.data.maintainerApplicationToReview?.project;
    const user = this.notification.data.maintainerApplicationToReview?.applicant;
    return `${user?.login} applied to ${project?.name}`;
  }

  getUrl() {
    const slug = this.notification.data.maintainerApplicationToReview?.project?.slug;
    return NEXT_ROUTER.projects.details.root(slug ?? "");
  }
}
