import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

export class SponsorLeadFundsUnallocatedFromProgram implements NotificationInterface {
  data: components["schemas"]["NotificationSponsorLeadFundsUnallocatedFromProgram"] | undefined;

  constructor(private notification: Notification) {
    this.data = notification.data.sponsorLeadFundsUnallocatedFromProgram;
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
    return "Allocation returned to you from program";
  }

  getDescription() {
    return `An allocation from ${this.data?.program.name} has been returned to you: ${this.data?.amount} ${this.data?.currencyCode}.`;
  }

  getUrl() {
    return "";
  }
}
