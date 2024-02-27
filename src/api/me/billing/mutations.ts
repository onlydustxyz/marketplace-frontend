import MeApi from "src/api/me";
import { MeTypes } from "src/api/me/types";
import { UseMutationProps, useBaseMutation } from "src/api/useBaseMutation";

import { ME_PATH } from "../path";

const useUpdateBillingProfileType = ({
  options = {},
}: UseMutationProps<unknown, unknown, { type: MeTypes.billingProfileType }>) => {
  return useBaseMutation<{ type: MeTypes.billingProfileType }, unknown>({
    resourcePath: ME_PATH.BILLING_PROFILES,
    method: "PATCH",
    invalidatesTags: [{ queryKey: MeApi.tags.user, exact: false }],
    ...options,
  });
};

export default {
  useUpdateBillingProfileType,
};
