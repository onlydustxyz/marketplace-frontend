import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface, NotificationResponse } from "core/domain/notification/models/notification.types";
import { ContributorInvoiceRejected } from "core/domain/notification/models/notifications/contributor-invoice-rejected";
import { ContributorProjectApplicationAccepted } from "core/domain/notification/models/notifications/contributor-project-application-accepted";
import { ContributorRewardCanceled } from "core/domain/notification/models/notifications/contributor-reward-canceled";
import { ContributorRewardPaid } from "core/domain/notification/models/notifications/contributor-reward-paid";
import { ContributorRewardReceived } from "core/domain/notification/models/notifications/contributor-reward-received";
import { GlobalBillingProfileVerificationFailed } from "core/domain/notification/models/notifications/global-billing-profile-verification-failed";
import { MaintainerApplicationToReview } from "core/domain/notification/models/notifications/maintainer-application-to-review";
import { MaintainerCommitteeApplicationCreated } from "core/domain/notification/models/notifications/maintainer-commitee-application-created";

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
      case "GLOBAL_BILLING_PROFILE_VERIFICATION_FAILED":
        return new GlobalBillingProfileVerificationFailed(notification);
    }
  }
}
