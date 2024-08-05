import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { NotificationFacadePort } from "core/domain/notification/input/notification-facade-port";

export function useReadAllNotifications({
  options,
}: UseMutationFacadeParams<NotificationFacadePort["readAllNotifications"]>) {
  const notificationStoragePort = bootstrap.getNotificationStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...notificationStoragePort.readAllNotifications({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: notificationStoragePort.getNotifications({}).tag,
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: notificationStoragePort.getNotificationsCount({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
