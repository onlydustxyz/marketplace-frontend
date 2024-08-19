import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class GlobalBillingProfileReminder implements NotificationInterface {
  data: components["schemas"]["NotificationGlobalBillingProfileReminder"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.globalBillingProfileReminder;
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
    return "Your billing profile is incomplete";
  }

  getDescription() {
    const { billingProfileName } = this.data || {};
    return `Your billing profile ${billingProfileName} is incomplete, please update it to complete the process`;
  }

  getUrl() {
    const { billingProfileId } = this.data || {};
    if (billingProfileId) {
      return NEXT_ROUTER.settings.billing.generalInformation(billingProfileId);
    }
    return undefined;
  }
}
