import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserNotificationsInterface } from "core/domain/user/models/user-notifications-model";

export function useGetMyNotificationsSettingsForProject({
  pathParams,
  options,
}: UseQueryFacadeParams<UserFacadePort["getMyNotificationSettingsForProject"], UserNotificationsInterface>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.getMyNotificationSettingsForProject({ pathParams }),
      options,
    })
  );
}
