import { DefaultError } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMutationAdapter } from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { ReactQueryMutationParameters } from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { SetMyProfileBody, SetMyProfileResponse } from "core/domain/user/user.types";
import { revalidateNextJsPath } from "core/infrastructure/marketplace-api-client-adapter/helpers/revalidate-nextjs-path";

export function useSetMyProfile({ options }: ReactQueryMutationParameters<UserFacadePort["setMyProfile"]> = {}) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation<SetMyProfileResponse, DefaultError, SetMyProfileBody>(
    useMutationAdapter({
      ...userStoragePort.setMyProfile({}),
      options: {
        onSuccess: async () => {
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
            queryKey: [userStoragePort.getMyProfile({}).tag],
            exact: false,
          });

          revalidateNextJsPath("/u/[githubLogin]", "page");
        },
        ...options,
      },
    })
  );
}
