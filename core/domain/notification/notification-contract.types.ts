import { NotificationInterface } from "core/domain/notification/models/notification.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components } from "src/__generated/api";

// Get notifications
export type GetNotificationsResponse = components["schemas"]["NotificationPageResponse"];
export type GetNotificationsModel = Omit<GetNotificationsResponse, "notifications"> & {
  notifications: NotificationInterface[];
};

export type GetNotificationsPortResponse = HttpStorageResponse<GetNotificationsModel>;

export type GetNotificationsPortParams = HttpClientParameters<object>;

// Get notifications count

export type GetNotificationsCountResponse = components["schemas"]["NotificationCountResponse"];

export type GetNotificationsCountPortResponse = HttpStorageResponse<GetNotificationsCountResponse>;

export type GetNotificationsCountPortParams = HttpClientParameters<object>;
