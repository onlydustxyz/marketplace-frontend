import {
  GetNotificationsCountPortParams,
  GetNotificationsCountPortResponse,
  GetNotificationsPortParams,
  GetNotificationsPortResponse,
} from "core/domain/notification/notification-contract.types";

export interface NotificationFacadePort {
  getNotifications(p: GetNotificationsPortParams): GetNotificationsPortResponse;
  getNotificationsCount(p: GetNotificationsCountPortParams): GetNotificationsCountPortResponse;
}
