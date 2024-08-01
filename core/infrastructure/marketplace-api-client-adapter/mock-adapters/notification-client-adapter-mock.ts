import { NotificationStoragePort } from "core/domain/notification/outputs/notification-storage-port";
import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class NotificationClientAdapterMock implements NotificationStoragePort {
  constructor() {}

  routes = {};

  getNotifications = mockHttpStorageResponse<NotificationStoragePort["getNotifications"]>;
}
