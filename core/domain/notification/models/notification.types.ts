import { components } from "src/__generated/api";

export type NotificationResponse = components["schemas"]["NotificationPageItemResponse"];

export interface NotificationInterface {
  getTitle(): string | undefined;
  getDescription(): string | undefined;
  hasRead(): boolean;
  getStatus(): NotificationResponse["status"];
  getUrl(): string | undefined;
  getId(): NotificationResponse["id"];
  getTimestamp(): NotificationResponse["timestamp"];
}
