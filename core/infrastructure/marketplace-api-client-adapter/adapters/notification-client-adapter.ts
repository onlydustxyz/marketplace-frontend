import { NotificationList } from "core/domain/notification/models/notification-list-model";
import {
  GetNotificationsCountResponse,
  GetNotificationsResponse,
} from "core/domain/notification/notification-contract.types";
import { NotificationStoragePort } from "core/domain/notification/outputs/notification-storage-port";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class NotificationClientAdapter implements NotificationStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getNotifications: "me/notifications",
    getNotificationsCount: "me/notifications/count",
  } as const;

  getNotifications = () => {
    const path = this.routes["getNotifications"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetNotificationsResponse>({
        path,
        method,
        tag,
      });

      return new NotificationList(data);
    };

    return {
      request,
      tag,
    };
  };

  getNotificationsCount = () => {
    const path = this.routes["getNotificationsCount"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      return this.client.request<GetNotificationsCountResponse>({
        path,
        method,
        tag,
      });
    };

    return {
      request,
      tag,
    };
  };
}
