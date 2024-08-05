import { useInfiniteQuery } from "@tanstack/react-query";
import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "core/bootstrap";
import { NotificationFacadePort } from "core/domain/notification/input/notification-facade-port";
import { GetNotificationsModel } from "core/domain/notification/notification-contract.types";

export function useGetNotifications({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<NotificationFacadePort["getNotifications"], GetNotificationsModel>) {
  const notificationStoragePort = bootstrap.getNotificationStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<NotificationFacadePort["getNotifications"], GetNotificationsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: notificationStoragePort.getNotifications,
    })
  );
}
