import { NotificationInterface } from "core/domain/notification/models/notification.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components } from "src/__generated/api";

export type GetNotificationsResponse = components["schemas"]["NotificationPageResponse"];

export type GetNotificationsPortResponse = HttpStorageResponse<
  Omit<GetNotificationsResponse, "notifications"> & {
    notifications: NotificationInterface[];
  }
>;

export type GetNotificationsPortParams = HttpClientParameters<object>;
