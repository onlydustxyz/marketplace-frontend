import { NotificationInterface } from "core/domain/notification/models/notification.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components, operations } from "src/__generated/api";

// Get notifications
export type GetNotificationsResponse = components["schemas"]["NotificationPageResponse"];
export type GetNotificationsModel = Omit<GetNotificationsResponse, "notifications"> & {
  notifications: NotificationInterface[];
};

type GetNotificationsQueryParams = operations["getMyNotifications"]["parameters"]["query"];

export type GetNotificationsPortResponse = HttpStorageResponse<GetNotificationsModel>;

export type GetNotificationsPortParams = HttpClientParameters<{
  QueryParams: GetNotificationsQueryParams;
}>;

// Get notifications count

export type GetNotificationsCountResponse = components["schemas"]["NotificationCountResponse"];

export type GetNotificationsCountPortResponse = HttpStorageResponse<GetNotificationsCountResponse>;

type GetNotificationsCountQueryParams = operations["getMyNotificationsCount"]["parameters"]["query"];

export type GetNotificationsCountPortParams = HttpClientParameters<{
  QueryParams: GetNotificationsCountQueryParams;
}>;

// Update notifications

export type UpdateNotificationsBody = components["schemas"]["NotificationsPatchRequest"];

export type UpdateNotificationsPortParams = HttpClientParameters<object>;

export type UpdateNotificationsPortResponse = HttpStorageResponse<never, UpdateNotificationsBody>;

// Read All notifications

export type ReadAllNotificationsPortParams = HttpClientParameters<object>;

export type ReadAllNotificationsPortResponse = HttpStorageResponse<never, never>;
