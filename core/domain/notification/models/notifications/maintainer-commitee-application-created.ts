import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";

export class MaintainerCommitteeApplicationCreated implements NotificationInterface {
  private notification: Notification;
  constructor(notification: Notification) {
    this.notification = notification;
  }
  getId(): string {
    return this.notification.id;
  }
  getTitle() {
    return `New committee application`;
  }

  getDescription() {
    return `View commite`;
  }

  getUrl() {
    return `${this.notification.id}`;
  }
}
