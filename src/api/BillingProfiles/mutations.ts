import { bootstrap } from "core/bootstrap";

import { components } from "src/__generated/api";
import { BILLING_PROFILES_PATH } from "src/api/BillingProfiles/path";
import { BILLING_PROFILES_TAGS } from "src/api/BillingProfiles/tags";
import MeApi from "src/api/me";
import { ME_BILLING_TAGS } from "src/api/me/billing/tags";
import { ME_TAGS } from "src/api/me/tags";
import { QueryParams } from "src/utils/getEndpointUrl";

import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { UseUploaderProps, useBaseUploader } from "../useBaseUploader";

export type UseCreateBillingProfileBody = components["schemas"]["BillingProfileRequest"];
export type UseCreateBillingProfileResponse = components["schemas"]["BillingProfileResponse"];
export type UseInviteBillingCoworkerBody = components["schemas"]["BillingProfileCoworkerInvitationRequest"];
export type UseInviteBillingCoworkerResponse = components["schemas"]["BillingProfileCoworkerInvitation"];
export type UseUpdatePayoutSettingsBody = components["schemas"]["BillingProfilePayoutInfoRequest"];
export type UseUpdatePayoutSettingsResponse = components["schemas"]["BillingProfilePayoutInfoResponse"];
export type UseEnableOrDisableBillingProfileBody = components["schemas"]["BillingProfileEnableRequest"];
export type UseAcceptInvoiceMandateBody = components["schemas"]["InvoiceMandateRequest"];
export type UseUpdateBillingTypeBody = components["schemas"]["BillingProfileTypeRequest"];
export type UseUpdateCoworkerRoleBody = components["schemas"]["UpdateCoworkerRoleRequest"];

const useCreateBillingProfile = ({
  options = {},
}: UseMutationProps<UseCreateBillingProfileResponse, unknown, UseCreateBillingProfileBody>) => {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useBaseMutation<UseCreateBillingProfileBody, UseCreateBillingProfileResponse>({
    resourcePath: BILLING_PROFILES_PATH.ROOT,
    method: "POST",
    invalidatesTags: [
      { queryKey: MeApi.tags.user, exact: false },
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.me, exact: false },
      { queryKey: ME_TAGS.payoutPreferences(), exact: false },
      { queryKey: ME_TAGS.rewards(), exact: false },
      { queryKey: userStoragePort.getMyOnboarding({}).tag, exact: false },
    ],
    ...options,
  });
};

const useDeleteBillingProfile = ({
  params,
  options = {},
}: UseMutationProps<void, { billingProfileId?: string }, void>) => {
  return useBaseMutation<void, void>({
    resourcePath: BILLING_PROFILES_PATH.BY_ID(params?.billingProfileId || ""),
    method: "DELETE",
    invalidatesTags: [
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
      { queryKey: MeApi.tags.user, exact: false },
      { queryKey: BILLING_PROFILES_TAGS.me, exact: false },
      { queryKey: ME_TAGS.payoutPreferences(), exact: false },
    ],
    ...options,
  });
};

const useEnableOrDisableBillingProfile = ({
  params,
  options = {},
}: UseMutationProps<void, { billingProfileId?: string }, UseEnableOrDisableBillingProfileBody>) => {
  return useBaseMutation<UseEnableOrDisableBillingProfileBody, void>({
    resourcePath: BILLING_PROFILES_PATH.ENABLE_OR_DISABLE_BY_ID(params?.billingProfileId || ""),
    method: "PUT",
    invalidatesTags: [
      { queryKey: BILLING_PROFILES_TAGS.single(params?.billingProfileId || ""), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.me, exact: false },
      { queryKey: ME_TAGS.payoutPreferences(), exact: false },
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
    ],
    ...options,
  });
};

const useUpdatePayoutSettings = ({
  options = {},
  params,
}: UseMutationProps<UseUpdatePayoutSettingsResponse, { id?: string }, UseUpdatePayoutSettingsBody>) => {
  return useBaseMutation<UseUpdatePayoutSettingsBody, UseUpdatePayoutSettingsResponse>({
    resourcePath: BILLING_PROFILES_PATH.PAYOUT(params?.id || ""),
    invalidatesTags: [
      { queryKey: MeApi.tags.all, exact: false },
      { queryKey: BILLING_PROFILES_TAGS.single(params?.id || ""), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.billing_profile_payment_methods(params?.id || ""), exact: false },
    ],
    method: "PUT",
    enabled: options?.enabled || !params?.id,
    ...options,
  });
};

const useUploadInvoice = ({
  params,
  options = {},
}: UseUploaderProps<{ url: string }, { billingProfileId: string; invoiceId: string; queryParams?: QueryParams }>) => {
  return useBaseUploader<{ url: string }>({
    ...params,
    resourcePath: BILLING_PROFILES_PATH.UPLOAD_INVOICE_LINKED_TO_PROFILE(
      params?.billingProfileId || "",
      params?.invoiceId || ""
    ),
    invalidatesTags: [
      { queryKey: MeApi.tags.rewards(), exact: false },
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
    ],
    enabled: !!params?.billingProfileId || !!params?.invoiceId,
    method: "POST",
    ...options,
  });
};

const useAcceptInvoiceMandate = ({
  params,
  options = {},
}: UseMutationProps<void, { billingProfileId?: string }, UseAcceptInvoiceMandateBody>) => {
  return useBaseMutation<UseAcceptInvoiceMandateBody, void>({
    resourcePath: BILLING_PROFILES_PATH.ACCEPT_INVOICE_MANDATE(params?.billingProfileId || ""),
    method: "PUT",
    enabled: !!params?.billingProfileId,
    ...options,
  });
};

const useInviteBillingCoworker = ({
  options = {},
  params,
}: UseMutationProps<UseInviteBillingCoworkerResponse, { billingProfileId?: string }, UseInviteBillingCoworkerBody>) => {
  return useBaseMutation<UseInviteBillingCoworkerBody, UseInviteBillingCoworkerResponse>({
    resourcePath: BILLING_PROFILES_PATH.INVITE_COWORKER_BY_ID(params?.billingProfileId || ""),
    method: "POST",
    invalidatesTags: [
      { queryKey: BILLING_PROFILES_TAGS.single(params?.billingProfileId || ""), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.billing_profile_coworkers(params?.billingProfileId || ""), exact: false },
    ],
    ...options,
  });
};

const useDeleteBillingCoworker = ({
  options = {},
  params,
}: UseMutationProps<void, { billingProfileId?: string; githubUserId?: string }, unknown>) => {
  return useBaseMutation<unknown, void>({
    resourcePath: BILLING_PROFILES_PATH.DELETE_COWORKER_BY_ID(
      params?.billingProfileId || "",
      params?.githubUserId || ""
    ),
    method: "DELETE",
    invalidatesTags: [
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.single(params?.billingProfileId || ""), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.billing_profile_coworkers(params?.billingProfileId || ""), exact: false },
    ],
    enabled: !!params?.billingProfileId && !!params?.githubUserId,
    ...options,
  });
};

const useUpdateBillingType = ({
  params,
  options,
}: UseMutationProps<void, { billingProfileId: string }, UseUpdateBillingTypeBody>) => {
  return useBaseMutation<UseUpdateBillingTypeBody, void>({
    resourcePath: BILLING_PROFILES_PATH.UPDATE_BILLING_PROFILES_TYPE(params?.billingProfileId || ""),
    enabled: !!params?.billingProfileId,
    method: "PUT",
    invalidatesTags: [
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.single(params?.billingProfileId || ""), exact: false },
    ],
    ...(options ? options : {}),
  });
};

const useUpdateCoworkerRole = ({
  params,
  options = {},
}: UseMutationProps<void, { billingProfileId?: string; githubUserId?: string }, UseUpdateCoworkerRoleBody>) => {
  return useBaseMutation<UseUpdateCoworkerRoleBody, void>({
    resourcePath: BILLING_PROFILES_PATH.UPDATE_COWORKER_ROLE(
      params?.billingProfileId || "",
      params?.githubUserId || ""
    ),
    invalidatesTags: [
      { queryKey: BILLING_PROFILES_TAGS.single(params?.billingProfileId || ""), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.billing_profile_coworkers(params?.billingProfileId || ""), exact: false },
    ],
    method: "PUT",
    enabled: !!params?.billingProfileId && !!params?.githubUserId,
    ...options,
  });
};

export default {
  useCreateBillingProfile,
  useDeleteBillingProfile,
  useUpdatePayoutSettings,
  useUploadInvoice,
  useAcceptInvoiceMandate,
  useInviteBillingCoworker,
  useDeleteBillingCoworker,
  useEnableOrDisableBillingProfile,
  useUpdateBillingType,
  useUpdateCoworkerRole,
};
