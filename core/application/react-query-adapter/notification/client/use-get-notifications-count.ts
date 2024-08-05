import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { NotificationFacadePort } from "core/domain/notification/input/notification-facade-port";
import { GetNotificationsCountResponse } from "core/domain/notification/notification-contract.types";

export function useGetNotificationsCount({
  options,
}: UseQueryFacadeParams<NotificationFacadePort["getNotificationsCount"], GetNotificationsCountResponse>) {
  const notificationStoragePort = bootstrap.getNotificationStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...notificationStoragePort.getNotificationsCount({}),
      options: {
        ...options,
        refetchOnWindowFocus: false,
        refetchInterval: 5000,
      },
    })
  );
}
