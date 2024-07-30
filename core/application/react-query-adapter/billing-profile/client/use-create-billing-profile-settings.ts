import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { CreateBillingProfileBody } from "core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "core/domain/billing-profile/inputs/billing-profile-facade-port";
import { BillingProfileShortInterface } from "core/domain/billing-profile/models/billing-profile-short-model";

export function useCreateBillingProfile({
  options,
}: UseMutationFacadeParams<
  BillingProfileFacadePort["createBillingProfile"],
  undefined,
  BillingProfileShortInterface,
  CreateBillingProfileBody
> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.createBillingProfile({}),
      options: {
        onSuccess: async () => {
          // await queryClient.invalidateQueries({
          //   queryKey: userStoragePort.getMyNotificationSettings({}).tag,
          //   exact: false,
          // });
        },
        ...options,
      },
    })
  );
}
