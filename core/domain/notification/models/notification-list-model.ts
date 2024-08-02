import { NotificationFactory } from "core/domain/notification/models/notification-model-factory";
import { NotificationInterface } from "core/domain/notification/models/notification.types";

import { components } from "src/__generated/api";

export type NotificationListResponse = components["schemas"]["NotificationPageResponse"];

export interface NotificationListInterface extends Omit<NotificationListResponse, "notifications"> {
  notifications: NotificationInterface[];
}

export class NotificationList implements NotificationListInterface {
  totalPageNumber!: NotificationListInterface["totalPageNumber"];
  totalItemNumber!: NotificationListInterface["totalItemNumber"];
  hasMore!: NotificationListInterface["hasMore"];
  nextPageIndex!: NotificationListInterface["nextPageIndex"];
  notifications!: NotificationListInterface["notifications"];
  constructor(props: NotificationListResponse) {
    Object.assign(this, props);

    this.notifications = props.notifications.map(notification => NotificationFactory.createNotification(notification));
  }
}
