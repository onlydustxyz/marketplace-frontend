import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { BillingProfileShortInterface } from "core/domain/billing-profile/models/billing-profile-short-model";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";

export function useGetMyBillingProfiles({
  options,
}: UseQueryFacadeParams<UserFacadePort["getMyBillingProfiles"], BillingProfileShortInterface>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.getMyBillingProfiles({}),
      options,
    })
  );
}
