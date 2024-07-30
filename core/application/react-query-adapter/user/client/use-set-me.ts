import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserInterface } from "core/domain/user/models/user-model";
import { SetMeBody } from "core/domain/user/user-contract.types";

export function useSetMe({
  options,
}: UseMutationFacadeParams<UserFacadePort["setMe"], undefined, UserInterface, SetMeBody>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.setMe({}),
      options: {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: userStoragePort.setMe({}).tag,
            exact: false,
          });
        },
        ...options,
      },
    })
  );
}
