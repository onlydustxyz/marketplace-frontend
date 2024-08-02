import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";

export class MaintainerCommitteeApplicationCreated implements NotificationInterface {
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
