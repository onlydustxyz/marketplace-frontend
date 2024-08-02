import {
  GetNotificationsPortParams,
  GetNotificationsPortResponse,
} from "core/domain/notification/notification-contract.types";

export interface NotificationFacadePort {
  getNotifications(p: GetNotificationsPortParams): GetNotificationsPortResponse;
}