import { bootstrap } from "core/bootstrap";

import { components } from "src/__generated/api";
import { BILLING_PROFILES_TAGS } from "src/api/BillingProfiles/tags";
import { ME_BILLING_TAGS } from "src/api/me/billing/tags";
import { ME_TAGS } from "src/api/me/tags";

import MeApi from ".";
import { PROJECT_TAGS } from "../Project/tags";
import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { UseUploaderProps, useBaseUploader } from "../useBaseUploader";
import { ME_PATH } from "./path";

export type UseUpdateMeMeBody = components["schemas"]["PatchMeContract"];

const useUpdateMe = ({ options = {} }: UseMutationProps<unknown, unknown, UseUpdateMeMeBody>) => {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useBaseMutation<UseUpdateMeMeBody, unknown>({
    resourcePath: ME_PATH.ROOT,
    method: "PATCH",
    invalidatesTags: [
      { queryKey: MeApi.tags.user, exact: false },
      {
        queryKey: userStoragePort.getMyOnboarding({}).tag,
        exact: false,
      },
    ],
    ...options,
  });
};

const useAcceptProjectLeaderInvitation = ({
  options = {},
  params,
}: UseMutationProps<unknown, { projectId: string; projectSlug: string }, null>) => {
  return useBaseMutation<null, unknown>({
    resourcePath: ME_PATH.PROJECT_LEADER_INVITATIONS(params?.projectId || ""),
    enabled: !!params?.projectId,
    invalidatesTags: [
      { queryKey: PROJECT_TAGS.detail_by_slug(params?.projectSlug || ""), exact: false },
      { queryKey: MeApi.tags.all, exact: false },
    ],
    ...options,
  });
};

const useClaimProject = ({
  params,
  options = {},
}: UseMutationProps<unknown, { projectId?: string; projectSlug?: string }, unknown>) => {
  return useBaseMutation<unknown, unknown>({
    resourcePath: ME_PATH.CLAIM(params?.projectId || ""),
    method: "PUT",
    enabled: !!params?.projectId,
    invalidatesTags: [
      { queryKey: PROJECT_TAGS.detail_by_slug(params?.projectSlug || ""), exact: false },
      { queryKey: MeApi.tags.all, exact: false },
    ],
    ...options,
  });
};

const usePayoutSettings = ({ options = {} }: UseMutationProps) => {
  return useBaseMutation<unknown, unknown>({
    resourcePath: ME_PATH.PAYOUT_SETTINGS,
    invalidatesTags: [{ queryKey: MeApi.tags.all, exact: false }],
    method: "PUT",
    ...options,
  });
};

const useApplyProject = ({
  params,
  options = {},
}: UseMutationProps<unknown, { projectSlug?: string }, { projectId: string }>) => {
  return useBaseMutation<{ projectId: string }, unknown>({
    resourcePath: ME_PATH.APPLY_TO_PROJECT,
    method: "POST",
    invalidatesTags: [
      { queryKey: PROJECT_TAGS.detail_by_slug(params?.projectSlug || ""), exact: false },
      { queryKey: MeApi.tags.all, exact: false },
    ],
    ...options,
  });
};

const useUploadProfilePicture = ({ options = {} }: UseUploaderProps<{ url: string }, undefined>) => {
  return useBaseUploader<{ url: string }>({
    resourcePath: ME_PATH.PROFILE_PICTURE,
    method: "POST",
    ...options,
  });
};

const useMarkInvoicesAsReceived = ({ options }: UseMutationProps<unknown, unknown, unknown>) => {
  return useBaseMutation<unknown, unknown>({
    resourcePath: ME_PATH.MARK_INVOICE_AS_RECEIVED,
    method: "POST",
    invalidatesTags: [
      { queryKey: MeApi.tags.rewards(), exact: false },
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
    ],
    ...(options ? options : {}),
  });
};

export type UseUpdatePayoutPreferencesBody = components["schemas"]["PayoutPreferenceRequest"];
const useUpdatePayoutPreferences = ({ options = {} }: UseMutationProps<unknown, UseUpdatePayoutPreferencesBody>) => {
  return useBaseMutation<UseUpdatePayoutPreferencesBody, unknown>({
    resourcePath: ME_PATH.PAYOUT_PREFERENCES,
    invalidatesTags: [
      { queryKey: ME_TAGS.user, exact: false },
      { queryKey: ME_TAGS.payoutPreferences(), exact: false },
      { queryKey: ME_TAGS.rewards(), exact: false },
      { queryKey: BILLING_PROFILES_TAGS.all, exact: false },
      { queryKey: ME_BILLING_TAGS.allProfiles(), exact: false },
    ],
    method: "PUT",
    ...options,
  });
};

export default {
  useAcceptProjectLeaderInvitation,
  useClaimProject,
  usePayoutSettings,
  useApplyProject,
  useUpdateMe,
  useUploadProfilePicture,
  useMarkInvoicesAsReceived,
  useUpdatePayoutPreferences,
};
