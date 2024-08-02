import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserProfileInterface } from "core/domain/user/models/user-profile-model";
import { ReplaceMyProfileBody } from "core/domain/user/user-contract.types";
import { revalidateNextJsPath } from "core/infrastructure/marketplace-api-client-adapter/helpers/revalidate-nextjs-path";

import MeApi from "src/api/me";

export function useReplaceMyProfile({
  options,
}: UseMutationFacadeParams<
  UserFacadePort["replaceMyProfile"],
  undefined,
  UserProfileInterface,
  ReplaceMyProfileBody
> = {}) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.replaceMyProfile({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          // V1 REQUESTS
          //  /api/v1/me/payout-preferences
          //  /api/v1/me
          //  /api/v1/me/rewards
          //  /api/v1/me/recommended-projects
          //  /api/v1/me/journey
          //  /api/v1/me/billing-profiles
          await queryClient.invalidateQueries({ queryKey: MeApi.tags.all, exact: false });

          await queryClient.invalidateQueries({
            queryKey: userStoragePort.getMyProfile({}).tag,
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: userStoragePort.getMyOnboarding({}).tag,
            exact: false,
          });

          await revalidateNextJsPath("/u/[githubLogin]", "page");

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
