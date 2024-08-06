import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "constants/router";

export class GlobalBillingProfileVerificationFailed implements NotificationInterface {
  data: components["schemas"]["NotificationGlobalBillingProfileVerificationFailed"] | undefined;
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
    return "Your billing profile verification has failed";
  }

  getDescription() {
    const { billingProfileName } = this.data || {};
    return `Your verification for your billing profile ${billingProfileName} has failed`;
  }

  getUrl() {
    const { billingProfileId } = this.data || {};
    if (billingProfileId) {
      return NEXT_ROUTER.settings.billing.generalInformation(billingProfileId);
    }
    return undefined;
  }
}
