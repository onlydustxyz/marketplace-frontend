import {Notification} from "core/domain/notification/models/notification-model";
import {NotificationInterface} from "core/domain/notification/models/notification.types";
import {NotificationStatus} from "core/domain/notification/notification-constants";

import {components} from "src/__generated/api";

export class SponsorLeadDepositApproved implements NotificationInterface {
  data: components["schemas"]["NotificationSponsorLeadDepositApproved"] | undefined;

  constructor(private notification: Notification) {
    this.data = notification.data.sponsorLeadDepositApproved;
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
    return "Deposit approved";
  }

  getDescription() {
    return `Your deposit ${this.data?.currencyCode} ${this.data?.amount} from ${this.data?.timestamp} was approved. Funds are now available for allocations.`;
  }

  getUrl() {
    return `${process.env.NEXT_PUBLIC_SAAS_URL}/sponsors/${this.data?.sponsor.id}`;
  }
}
