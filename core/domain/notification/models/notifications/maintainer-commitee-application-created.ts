import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";

export class MaintainerCommitteeApplicationCreated implements NotificationInterface {
  private notification: Notification;
  constructor(notification: Notification) {
    this.notification = notification;
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
  getTitle() {
    return "New committee application";
  }

  getDescription() {
    const committeeName = this.notification.data.maintainerCommitteeApplicationCreated?.committeeName;
    return `You have applied to ${committeeName} committee.`;
  }

  getUrl() {
    return `${this.notification.id}`;
  }
}
