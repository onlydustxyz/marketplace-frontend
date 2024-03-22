import MeApi from "src/api/me";
import { ME_BILLING_TAGS } from "src/api/me/billing/tags";
import { ME_TAGS } from "src/api/me/tags";
import { MeTypes } from "src/api/me/types";
import { UseMutationProps, useBaseMutation } from "src/api/useBaseMutation";

import { ME_PATH } from "../path";

const useUpdateBillingProfileType = ({
  options = {},
}: UseMutationProps<unknown, unknown, { type: MeTypes.billingProfileType }>) => {
  return useBaseMutation<{ type: MeTypes.billingProfileType }, unknown>({
    resourcePath: ME_PATH.BILLING_PROFILES,
    method: "PATCH",
    invalidatesTags: [
      { queryKey: MeApi.tags.user, exact: false },
      { queryKey: ME_BILLING_TAGS.allProfiles, exact: false },
      { queryKey: ME_TAGS.rewards(), exact: false },
    ],
    ...options,
  });
};

export default {
  useUpdateBillingProfileType,
};
