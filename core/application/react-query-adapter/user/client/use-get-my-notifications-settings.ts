import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserNotificationSettingsInterface } from "core/domain/user/models/user-notification-settings-model";

export function useGetMyNotificationsSettings({
  options,
}: UseQueryFacadeParams<UserFacadePort["getMyNotificationSettings"], UserNotificationSettingsInterface>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.getMyNotificationSettings({}),
      options,
    })
  );
}
