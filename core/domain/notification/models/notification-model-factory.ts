import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface, NotificationResponse } from "core/domain/notification/models/notification.types";
import { ContributorInvoiceRejected } from "core/domain/notification/models/notifications/contributor-invoice-rejected";
import { ContributorProjectApplicationAccepted } from "core/domain/notification/models/notifications/contributor-project-application-accepted";
import { ContributorRewardCanceled } from "core/domain/notification/models/notifications/contributor-reward-canceled";
import { ContributorRewardPaid } from "core/domain/notification/models/notifications/contributor-reward-paid";
import { ContributorRewardReceived } from "core/domain/notification/models/notifications/contributor-reward-received";
import { GlobalBillingProfileReminder } from "core/domain/notification/models/notifications/global-billing-profile-reminder";
import { MaintainerApplicationToReview } from "core/domain/notification/models/notifications/maintainer-application-to-review";
import { MaintainerCommitteeApplicationCreated } from "core/domain/notification/models/notifications/maintainer-commitee-application-created";

import { GlobalBillingProfileVerificationClosed } from "./notifications/global-billing-profile-verification-closed";
import { GlobalBillingProfileVerificationRejected } from "./notifications/global-billing-profile-verification-rejected";
import {ContributorProjectApplicationRefused} from "./notifications/contributor-project-application-refused";

export class NotificationFactory {
  static createNotification(notificationResponse: NotificationResponse): NotificationInterface {
    const notification = new Notification(notificationResponse);

    switch (notification.type) {
      case "MAINTAINER_APPLICATION_TO_REVIEW":
        return new MaintainerApplicationToReview(notification);
      case "MAINTAINER_COMMITTEE_APPLICATION_CREATED":
        return new MaintainerCommitteeApplicationCreated(notification);
      case "CONTRIBUTOR_INVOICE_REJECTED":
        return new ContributorInvoiceRejected(notification);
      case "CONTRIBUTOR_REWARD_CANCELED":
        return new ContributorRewardCanceled(notification);
      case "CONTRIBUTOR_REWARD_RECEIVED":
        return new ContributorRewardReceived(notification);
      case "CONTRIBUTOR_REWARDS_PAID":
        return new ContributorRewardPaid(notification);
      case "CONTRIBUTOR_PROJECT_APPLICATION_ACCEPTED":
        return new ContributorProjectApplicationAccepted(notification);
      case "GLOBAL_BILLING_PROFILE_REMINDER":
        return new GlobalBillingProfileReminder(notification);
      case "GLOBAL_BILLING_PROFILE_VERIFICATION_CLOSED":
        return new GlobalBillingProfileVerificationClosed(notification);
      case "GLOBAL_BILLING_PROFILE_VERIFICATION_REJECTED":
        return new GlobalBillingProfileVerificationRejected(notification);
      case "CONTRIBUTOR_PROJECT_APPLICATION_REFUSED":
        return new ContributorProjectApplicationRefused(notification);
    }
  }
}
