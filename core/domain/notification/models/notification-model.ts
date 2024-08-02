import { NotificationResponse } from "core/domain/notification/models/notification.types";

export class Notification implements NotificationResponse {
  id!: NotificationResponse["id"];
  timestamp!: NotificationResponse["timestamp"];
  status!: NotificationResponse["status"];
  type!: NotificationResponse["type"];
  data!: NotificationResponse["data"];
  constructor(props: NotificationResponse) {
    Object.assign(this, props);
  }
}
