// export type NotificationResponse = components["schemas"]["NotificationResponse"];
import { Notification, NotificationInterface } from "core/domain/notification/models/notification-model";

export type NotificationListResponse = {
  notifications: {
    id: string;
    timestamp: string;
    status: "READ" | "UNREAD";
  }[];
};

export interface NotificationListInterface extends NotificationListResponse {
  notifications: NotificationInterface[];
}

export class NotificationList implements NotificationListInterface {
  notifications!: NotificationListInterface["notifications"];
  constructor(props: NotificationListResponse) {
    Object.assign(this, props);

    this.notifications = props.notifications.map(notification => new Notification(notification));
  }
}
