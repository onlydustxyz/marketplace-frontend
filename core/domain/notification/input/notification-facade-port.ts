import {
  GetNotificationsCountPortParams,
  GetNotificationsCountPortResponse,
  GetNotificationsPortParams,
  GetNotificationsPortResponse,
  ReadAllNotificationsPortParams,
  ReadAllNotificationsPortResponse,
  UpdateNotificationsPortParams,
  UpdateNotificationsPortResponse,
} from "core/domain/notification/notification-contract.types";

export interface NotificationFacadePort {
  getNotifications(p: GetNotificationsPortParams): GetNotificationsPortResponse;
  getNotificationsCount(p: GetNotificationsCountPortParams): GetNotificationsCountPortResponse;
  updateNotifications(p: UpdateNotificationsPortParams): UpdateNotificationsPortResponse;
  readAllNotifications(p: ReadAllNotificationsPortParams): ReadAllNotificationsPortResponse;
}
