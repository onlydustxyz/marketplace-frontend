import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

export class SponsorLeadDepositRejected implements NotificationInterface {
  data: components["schemas"]["NotificationSponsorLeadDepositRejected"] | undefined;

  constructor(private notification: Notification) {
    this.data = notification.data.sponsorLeadDepositRejected;
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
    return "Deposit rejected";
  }

  getDescription() {
    return `Your deposit ${this.data?.amount} ${this.data?.currencyCode} from ${this.data?.timestamp} was rejected. Please check the details and try again.`;
  }

  getUrl() {
    return "";
  }
}
