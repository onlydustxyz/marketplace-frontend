import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

// export type GetNotificationResponse = components["schemas"]["NotificationResponse"];
export type GetNotificationsResponse = {
  notifications: {
    id: string;
    timestamp: string;
    status: "READ" | "UNREAD";
  }[];
};

export type GetNotificationsPortResponse = HttpStorageResponse<GetNotificationsResponse>;

export type GetNotificationsPortParams = HttpClientParameters<object>;
