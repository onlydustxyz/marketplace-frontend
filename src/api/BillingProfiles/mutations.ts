import { components } from "src/__generated/api";
import { BILLING_PROFILES_PATH } from "src/api/BillingProfiles/path";
import { BILLING_PROFILES_TAGS } from "src/api/BillingProfiles/tags";
import MeApi from "src/api/me";

import { UseMutationProps, useBaseMutation } from "../useBaseMutation";

export type UseCreateBillingProfileBody = components["schemas"]["BillingProfileRequest"];
export type UseCreateBillingProfileResponse = components["schemas"]["BillingProfileResponse"];

const useCreateBillingProfile = ({
  options = {},
}: UseMutationProps<UseCreateBillingProfileResponse, unknown, UseCreateBillingProfileBody>) => {
  return useBaseMutation<UseCreateBillingProfileBody, UseCreateBillingProfileResponse>({
    resourcePath: BILLING_PROFILES_PATH.root,
    method: "POST",
    invalidatesTags: [
      { queryKey: MeApi.tags.user, exact: false },
      { queryKey: BILLING_PROFILES_TAGS.me, exact: false },
    ],
    ...options,
  });
};

export default {
  useCreateBillingProfile,
};
