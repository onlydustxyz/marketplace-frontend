import {
  GetNotificationsPortParams,
  GetNotificationsPortResponse,
} from "core/domain/notification/notification-contract.types";

export interface NotificationStoragePort {
  routes: Record<string, string>;
  getNotifications(p: GetNotificationsPortParams): GetNotificationsPortResponse;
}
