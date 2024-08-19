import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class ContributorInvoiceRejected implements NotificationInterface {
  data: components["schemas"]["NotificationContributorInvoiceRejected"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorInvoiceRejected;
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
    return "Your invoice has been rejected";
  }

  getDescription() {
    const { invoiceName, rejectionReason } = this.data || {};
    return `Your invoice ${invoiceName} has been rejected because of : ${rejectionReason}`;
  }

  getUrl() {
    const { billingProfileId } = this.data || {};
    if (billingProfileId) {
      return NEXT_ROUTER.settings.billing.invoices(billingProfileId);
    }
    return undefined;
  }
}
