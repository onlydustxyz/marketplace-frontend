import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

export class MaintainerCommitteeApplicationCreated implements NotificationInterface {
  data: components["schemas"]["NotificationMaintainerCommitteeApplicationCreated"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.maintainerCommitteeApplicationCreated;
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
    return "New committee application";
  }

  getDescription() {
    const { committeeName } = this.data || {};
    return `You have applied to ${committeeName} committee.`;
  }

  getUrl() {
    const { committeeId } = this.data || {};
    if (committeeId) {
      return `/c/${committeeId}/applicant`;
    }
    return undefined;
  }
}
