import { NotificationFactory } from "core/domain/notification/models/notification-model-factory";
import { NotificationInterface } from "core/domain/notification/models/notification.types";

import { components } from "src/__generated/api";

// keep this in case of adding more properties in list response
export type NotificationListResponse = Pick<components["schemas"]["NotificationPageResponse"], "notifications">;

export interface NotificationListInterface extends Omit<NotificationListResponse, "notifications"> {
  notifications: NotificationInterface[];
}

export class NotificationList implements NotificationListInterface {
  notifications!: NotificationListInterface["notifications"];
  constructor(props: NotificationListResponse) {
    Object.assign(this, props);

    this.notifications = props.notifications.map(notification => NotificationFactory.createNotification(notification));
  }
}
