import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import MeApi from "src/api/me";
import { MeTypes } from "src/api/me/types";
import { UseMutationProps, useBaseMutation } from "src/api/useBaseMutation";

export type UseUpdateMeMeBody = components["schemas"]["PatchMeContract"];

const useUpdateBillingProfileType = ({
  options = {},
}: UseMutationProps<unknown, unknown, { type: MeTypes.billingProfileType }>) => {
  return useBaseMutation<{ type: MeTypes.billingProfileType }, unknown>({
    resourcePath: API_PATH.ME_BILLING_PROFILES,
    method: "PATCH",
    invalidatesTags: [{ queryKey: MeApi.tags.user, exact: false }],
    ...options,
  });
};

export default {
  useUpdateBillingProfileType,
};
