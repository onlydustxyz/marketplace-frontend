import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "core/bootstrap";
import { CreateBillingProfileBody } from "core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "core/domain/billing-profile/inputs/billing-profile-facade-port";
import { BillingProfileShortInterface } from "core/domain/billing-profile/models/billing-profile-short-model";

import { ME_BILLING_TAGS } from "src/api/me/billing/tags";

export function useCreateBillingProfile({
  options,
}: UseMutationFacadeParams<
  BillingProfileFacadePort["createBillingProfile"],
  undefined,
  BillingProfileShortInterface,
  CreateBillingProfileBody
> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.createBillingProfile({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: ME_BILLING_TAGS.allProfiles(),
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: userStoragePort.getMyOnboarding({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
