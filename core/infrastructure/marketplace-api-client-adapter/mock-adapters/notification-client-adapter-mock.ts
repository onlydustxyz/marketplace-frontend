import { NotificationFactory } from "core/domain/notification/models/notification-model-factory";
import { NotificationStoragePort } from "core/domain/notification/outputs/notification-storage-port";

export class NotificationClientAdapterMock implements NotificationStoragePort {
  constructor() {}

  routes = {};

  // getNotifications = mockHttpStorageResponse<NotificationStoragePort["getNotifications"]>;

  getNotifications = () => {
    const request = async () => {
      return {
        totalPageNumber: 0,
        totalItemNumber: 0,
        hasMore: true,
        nextPageIndex: 0,
        notifications: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            timestamp: "2024-08-02T08:47:03.016Z",
            status: "UNREAD" as const,
            type: "MAINTAINER_APPLICATION_TO_REVIEW" as const,
            data: {
              maintainerApplicationToReview: {
                project: {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  slug: "my-awesome-project",
                  name: "string",
                  logoUrl: "string",
                },
                applicant: {
                  githubUserId: 595505,
                  login: "ofux",
                  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
                  isRegistered: true,
                },
              },
            },
          },
          {
            id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
            timestamp: "2024-08-02T08:47:03.016Z",
            status: "UNREAD" as const,
            type: "MAINTAINER_COMMITTEE_APPLICATION_CREATED" as const,
            data: {
              maintainerCommitteeApplicationCreated: {
                committeeName: "string",
              },
            },
          },
        ].map(notification => NotificationFactory.createNotification(notification)),
      };
    };

    return {
      request,
      tag: [""],
    };
  };

  // getNotificationsCount = mockHttpStorageResponse<NotificationStoragePort["getNotificationsCount"]>
  getNotificationsCount = () => {
    const request = async () => {
      return {
        count: 2,
      };
    };

    return {
      request,
      tag: [""],
    };
  };
}
