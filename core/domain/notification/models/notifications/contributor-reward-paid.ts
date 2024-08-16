import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { NotificationStatus } from "core/domain/notification/notification-constants";

import { components } from "src/__generated/api";

import { NEXT_ROUTER } from "../../../../../constants/router";

export class ContributorRewardPaid implements NotificationInterface {
  data: components["schemas"]["NotificationContributorRewardsPaid"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorRewardsPaid;
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
    return "Your rewards has been paid";
  }

  getDescription() {
    const { numberOfRewardPaid, totalAmountDollarsEquivalent } = this.data || {};
    return `${numberOfRewardPaid} reward(s) has been paid for a total of ${totalAmountDollarsEquivalent} USD`;
  }

  getUrl() {
    return NEXT_ROUTER.rewards.all;
  }
}
