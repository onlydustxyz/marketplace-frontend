import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserOnboardingInterface } from "core/domain/user/models/user-onboarding-model";

export function useGetMyOnboarding({
  options,
}: UseQueryFacadeParams<UserFacadePort["getMyOnboarding"], UserOnboardingInterface>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.getMyOnboarding({}),
      options,
    })
  );
}
