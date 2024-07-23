import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { HackathonFacadePort } from "core/domain/hackathon/inputs/hackathon-facade-port";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { FirstParameter } from "core/helpers/types";
import { revalidateNextJsPath } from "core/infrastructure/marketplace-api-client-adapter/helpers/revalidate-nextjs-path";

export function useRegisterToHackathon({
  pathParams,
  options,
  invalidateTagParams = {
    getHackathonBySlug: { pathParams: { hackathonSlug: "" } },
  },
}: UseMutationFacadeParams<
  UserFacadePort["registerToHackathon"],
  {
    getHackathonBySlug: FirstParameter<HackathonFacadePort["getHackathonBySlug"]>;
  }
>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.registerToHackathon({ pathParams }),
      options: {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: hackathonStoragePort.getHackathonBySlug(invalidateTagParams.getHackathonBySlug).tag,
            exact: false,
          });

          await revalidateNextJsPath("/hackathons", "page");
          await revalidateNextJsPath("/hackathons/[hackathonSlug]", "page");
        },
        ...options,
      },
    })
  );
}
