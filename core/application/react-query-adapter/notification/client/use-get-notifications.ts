import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { NotificationFacadePort } from "core/domain/notification/input/notification-facade-port";
import { NotificationInterface } from "core/domain/notification/models/notification.types";
import { GetNotificationsResponse } from "core/domain/notification/notification-contract.types";

export function useGetNotifications({
  options,
}: UseQueryFacadeParams<
  NotificationFacadePort["getNotifications"],
  Omit<GetNotificationsResponse, "notifications"> & {
    notifications: NotificationInterface[];
  }
>) {
  const notificationStoragePort = bootstrap.getNotificationStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...notificationStoragePort.getNotifications({}),
      options,
    })
  );
}
