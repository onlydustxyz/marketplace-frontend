import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserProfileInterface } from "core/domain/user/models/user-profile-model";
import { SetMyProfileBody } from "core/domain/user/user-contract.types";
import { revalidateNextJsPath } from "core/infrastructure/marketplace-api-client-adapter/helpers/revalidate-nextjs-path";

export function useSetMyProfile({
  options,
}: UseMutationFacadeParams<UserFacadePort["setMyProfile"], undefined, UserProfileInterface, SetMyProfileBody> = {}) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.setMyProfile({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          // TODO @hayden invalidate all /me queries like before
          //  /api/v1/me/payout-preferences
          //  /api/v1/me
          //  /api/v1/me/rewards
          //  /api/v1/me/recommended-projects
          //  /api/v1/me/journey
          //  /api/v1/me/billing-profiles
          //
          //  invalidatesTags: [{ queryKey: MeApi.tags.all, exact: false }],

          await queryClient.invalidateQueries({
            queryKey: userStoragePort.getMyProfile({}).tag,
            exact: false,
          });

          await revalidateNextJsPath("/u/[githubLogin]", "page");

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
