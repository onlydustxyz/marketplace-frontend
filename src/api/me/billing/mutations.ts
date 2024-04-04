import { components } from "src/__generated/api";
import { BILLING_PROFILES_TAGS } from "src/api/BillingProfiles/tags";
import { ME_BILLING_TAGS } from "src/api/me/billing/tags";
import { UseMutationProps, useBaseMutation } from "src/api/useBaseMutation";

import { ME_PATH } from "../path";

export type UseAcceptOrDeclineInvitationBody = components["schemas"]["BillingProfileCoworkerInvitationUpdateRequest"];

const useAcceptInvitation = ({
  params,
  options,
}: UseMutationProps<void, { billingProfileId: string }, UseAcceptOrDeclineInvitationBody>) => {
  return useBaseMutation<UseAcceptOrDeclineInvitationBody, void>({
    resourcePath: ME_PATH.BILLING_PROFILES_INVITATIONS(params?.billingProfileId || ""),
    enabled: !!params?.billingProfileId,
    method: "POST",
    invalidatesTags: [
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.single(params?.billingProfileId || ""), exact: false },
    ],
    ...(options ? options : {}),
  });
};

const useDeclineInvitation = ({
  params,
  options,
}: UseMutationProps<void, { billingProfileId: string }, UseAcceptOrDeclineInvitationBody>) => {
  return useBaseMutation<UseAcceptOrDeclineInvitationBody, void>({
    resourcePath: ME_PATH.BILLING_PROFILES_INVITATIONS(params?.billingProfileId || ""),
    enabled: !!params?.billingProfileId,
    method: "POST",
    invalidatesTags: [{ queryKey: ME_BILLING_TAGS.allProfiles(), exact: false }],
    ...(options ? options : {}),
  });
};

export default {
  useAcceptInvitation,
  useDeclineInvitation,
};
