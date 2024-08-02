import { NotificationInterface } from "core/domain/notification/models/notification.types";

export namespace TNotificationItem {
  export interface Props {
    notification: NotificationInterface;
    onClick: () => void;
  }
}
