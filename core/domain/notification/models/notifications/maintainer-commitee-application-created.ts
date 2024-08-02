import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

export class MaintainerCommitteeApplicationCreated implements NotificationInterface {
  constructor(private notification: Notification) {}
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
