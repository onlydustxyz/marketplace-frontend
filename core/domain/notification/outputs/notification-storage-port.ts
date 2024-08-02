import {
  GetNotificationsCountPortParams,
  GetNotificationsCountPortResponse,
  GetNotificationsPortParams,
  GetNotificationsPortResponse,
} from "core/domain/notification/notification-contract.types";

export interface NotificationStoragePort {
  routes: Record<string, string>;
  getNotifications(p: GetNotificationsPortParams): GetNotificationsPortResponse;
  getNotificationsCount(p: GetNotificationsCountPortParams): GetNotificationsCountPortResponse;
}
