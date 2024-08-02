import { Notification } from "core/domain/notification/models/notification-model";
import { NotificationInterface, NotificationResponse } from "core/domain/notification/models/notification.types";
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
    }
  }
}
