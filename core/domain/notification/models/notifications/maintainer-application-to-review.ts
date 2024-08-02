import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";

export class MaintainerApplicationToReview implements NotificationInterface {
  private notification: Notification;
  constructor(notification: Notification) {
    this.notification = notification;
  }

  getId(): string {
    return this.notification.id;
  }

  getTitle() {
    return `New application`;
  }

  getDescription() {
    return `View application`;
  }

  getUrl() {
    return `${this.notification.data.maintainerApplicationToReview?.project.slug}`;
  }
}
