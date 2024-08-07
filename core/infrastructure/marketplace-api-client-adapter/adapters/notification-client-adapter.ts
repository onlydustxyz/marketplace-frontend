import { NotificationFactory } from "core/domain/notification/models/notification-model-factory";
import {
  GetNotificationsCountResponse,
  GetNotificationsResponse,
  UpdateNotificationsBody,
} from "core/domain/notification/notification-contract.types";
import { NotificationStoragePort } from "core/domain/notification/outputs/notification-storage-port";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class NotificationClientAdapter implements NotificationStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getNotifications: "me/notifications",
    getNotificationsCount: "me/notifications/count",
    updateNotifications: "me/notifications",
    readAllNotifications: "me/notifications/all",
  } as const;

  getNotifications = ({ queryParams }: FirstParameter<NotificationStoragePort["getNotifications"]>) => {
    const path = this.routes["getNotifications"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetNotificationsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        notifications: data.notifications.map(notification => NotificationFactory.createNotification(notification)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getNotificationsCount = ({ queryParams }: FirstParameter<NotificationStoragePort["getNotificationsCount"]>) => {
    const path = this.routes["getNotificationsCount"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      return this.client.request<GetNotificationsCountResponse>({
        path,
        method,
        tag,
        queryParams,
      });
    };

    return {
      request,
      tag,
    };
  };

  updateNotifications = () => {
    const path = this.routes["updateNotifications"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: UpdateNotificationsBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  readAllNotifications = () => {
    const path = this.routes["readAllNotifications"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async () =>
      this.client.request<never>({
        path,
        method,
        tag,
      });

    return {
      request,
      tag,
    };
  };
}
