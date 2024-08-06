import { NotificationFactory } from "core/domain/notification/models/notification-model-factory";
import { UpdateNotificationsBody } from "core/domain/notification/notification-contract.types";
import { NotificationStoragePort } from "core/domain/notification/outputs/notification-storage-port";
import { FirstParameter } from "core/helpers/types";

export class NotificationClientAdapterMock implements NotificationStoragePort {
  constructor() {}

  routes = {};

  // getNotifications = mockHttpStorageResponse<NotificationStoragePort["getNotifications"]>;

  getNotifications = (_: FirstParameter<NotificationStoragePort["getNotifications"]>) => {
    const request = async () => {
      return {
        totalPageNumber: 0,
        totalItemNumber: 0,
        hasMore: true,
        nextPageIndex: 0,
        notifications: [
          {
            id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
            timestamp: "2024-08-02T08:47:03.016Z",
            status: "UNREAD" as const,
            type: "MAINTAINER_COMMITTEE_APPLICATION_CREATED" as const,
            data: {
              maintainerCommitteeApplicationCreated: {
                committeeId: "string",
                committeeName: "string",
              },
            },
          },
        ].map(notification => NotificationFactory.createNotification(notification)),
      };
    };

    return {
      request,
      tag: ["getNotifications"],
    };
  };

  // getNotificationsCount = mockHttpStorageResponse<NotificationStoragePort["getNotificationsCount"]>
  getNotificationsCount = (_: FirstParameter<NotificationStoragePort["getNotificationsCount"]>) => {
    const request = async () => {
      return {
        count: 2,
      };
    };

    return {
      request,
      tag: ["getNotificationsCount"],
    };
  };

  // updateNotifications = mockHttpStorageResponse<NotificationStoragePort["getNotificationsCount"]>

  updateNotifications = () => {
    const request = async (_: UpdateNotificationsBody) => {
      return true as never;
    };

    return {
      request,
      tag: ["updateNotifications"],
    };
  };

  // readAllNotifications = mockHttpStorageResponse<NotificationStoragePort["getNotificationsCount"]>
  readAllNotifications = () => {
    const request = async () => {
      return true as never;
    };

    return {
      request,
      tag: ["readAllNotifications"],
    };
  };
}
