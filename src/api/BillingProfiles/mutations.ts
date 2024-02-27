import { components } from "src/__generated/api";
import { BILLING_PROFILES_PATH } from "src/api/BillingProfiles/path";
import { BILLING_PROFILES_TAGS } from "src/api/BillingProfiles/tags";
import MeApi from "src/api/me";
import { ME_TAGS } from "src/api/me/tags";

import { UseMutationProps, useBaseMutation } from "../useBaseMutation";

export type UseCreateBillingProfileBody = components["schemas"]["BillingProfileRequest"];
export type UseCreateBillingProfileResponse = components["schemas"]["BillingProfileResponse"];
export type UseUpdatePayoutSettingsBody = components["schemas"]["BillingProfilePayoutInfoRequest"];
export type UseUpdatePayoutSettingsResponse = components["schemas"]["BillingProfilePayoutInfoResponse"];

const useCreateBillingProfile = ({
  options = {},
}: UseMutationProps<UseCreateBillingProfileResponse, unknown, UseCreateBillingProfileBody>) => {
  return useBaseMutation<UseCreateBillingProfileBody, UseCreateBillingProfileResponse>({
    resourcePath: BILLING_PROFILES_PATH.root,
    method: "POST",
    invalidatesTags: [
      { queryKey: MeApi.tags.user, exact: false },
      { queryKey: BILLING_PROFILES_TAGS.me, exact: false },
      { queryKey: ME_TAGS.payoutPreferences(), exact: false },
    ],
    ...options,
  });
};

const useUpdatePayoutSettings = ({
  options = {},
  params,
}: UseMutationProps<UseUpdatePayoutSettingsResponse, { id?: string }, UseUpdatePayoutSettingsBody>) => {
  return useBaseMutation<UseUpdatePayoutSettingsBody, UseUpdatePayoutSettingsResponse>({
    resourcePath: BILLING_PROFILES_PATH.payout(params?.id || ""),
    invalidatesTags: [{ queryKey: MeApi.tags.all, exact: false }],
    method: "PUT",
    enabled: options?.enabled || !params?.id,
    ...options,
  });
};

export default {
  useCreateBillingProfile,
  useUpdatePayoutSettings,
};
