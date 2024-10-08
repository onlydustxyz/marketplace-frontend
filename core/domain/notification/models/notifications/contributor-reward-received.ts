import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class ContributorRewardReceived implements NotificationInterface {
  data: components["schemas"]["NotificationContributorRewardReceived"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorRewardReceived;
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
    return "You have received a new reward";
  }

  getDescription() {
    const { projectName, currencyCode, amount, sentByGithubLogin } = this.data || {};
    return `${sentByGithubLogin} sent you a new reward of ${amount} ${currencyCode} on project ${projectName}`;
  }

  getUrl() {
    return NEXT_ROUTER.rewards.all;
  }
}
