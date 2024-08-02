import { NotificationList } from "core/domain/notification/models/notification-list-model";
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
        ...new NotificationList({
          notifications: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              timestamp: "2024-08-02T08:47:03.016Z",
              status: "UNREAD",
              type: "MAINTAINER_APPLICATION_TO_REVIEW",
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
              status: "UNREAD",
              type: "MAINTAINER_COMMITTEE_APPLICATION_CREATED",
              data: {
                maintainerCommitteeApplicationCreated: {
                  committeeName: "string",
                },
              },
            },
          ],
        }),
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
