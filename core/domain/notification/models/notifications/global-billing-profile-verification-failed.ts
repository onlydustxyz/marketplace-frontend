import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class GlobalBillingProfileVerificationFailed implements NotificationInterface {
  data: components["schemas"]["NotificationGlobalBillingProfileVerificationFailed"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.globalBillingProfileVerificationFailed;
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
    return "Your billing profile requires an action.";
  }

  getDescription() {
    const { billingProfileName } = this.data || {};
    return `An anomaly has occurred in the verification process for your billing profile ${billingProfileName}. Please refer to the following steps to redo the verification and resolve the issue.`;
  }

  getUrl() {
    const { billingProfileId } = this.data || {};
    if (billingProfileId) {
      return NEXT_ROUTER.settings.billing.generalInformation(billingProfileId);
    }
    return undefined;
  }
}
