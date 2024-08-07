import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { SetMyNotificationSettingsBody } from "core/domain/user/user-contract.types";

export function useSetMyNotificationsSettings({
  pathParams,
  options,
}: UseMutationFacadeParams<
  UserFacadePort["setMyNotificationSettings"],
  undefined,
  never,
  SetMyNotificationSettingsBody
> = {}) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.setMyNotificationSettings({ pathParams }),
      options: {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: userStoragePort.getMyNotificationSettings({}).tag,
            exact: false,
          });
        },
        ...options,
      },
    })
  );
}
