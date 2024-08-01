// export type NotificationResponse = components["schemas"]["NotificationResponse"];
export type NotificationResponse = {
  id: string;
  timestamp: string;
  status: "READ" | "UNREAD";
};

export interface NotificationInterface extends NotificationResponse {}

export class Notification implements NotificationInterface {
  id!: NotificationResponse["id"];
  timestamp!: NotificationResponse["timestamp"];
  status!: NotificationResponse["status"];
  constructor(props: NotificationResponse) {
    Object.assign(this, props);
  }
}
