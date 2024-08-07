import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserNotificationsInterface } from "core/domain/user/models/user-notifications-model";
import { SetMyNotificationSettingsForProjectBody } from "core/domain/user/user-contract.types";

export function useSetMyNotificationsSettingsForProject({
  pathParams,
  options,
}: UseMutationFacadeParams<
  UserFacadePort["setMyNotificationSettingsForProject"],
  undefined,
  UserNotificationsInterface,
  SetMyNotificationSettingsForProjectBody
> = {}) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.setMyNotificationSettingsForProject({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: userStoragePort.getMyNotificationSettingsForProject({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
