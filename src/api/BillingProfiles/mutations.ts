import { components } from "src/__generated/api";
import { BILLING_PROFILES_PATH } from "src/api/BillingProfiles/path";
import { BILLING_PROFILES_TAGS } from "src/api/BillingProfiles/tags";
import MeApi from "src/api/me";
import { ME_TAGS } from "src/api/me/tags";
import { QueryParams } from "src/utils/getEndpointUrl";

import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { UseUploaderProps, useBaseUploader } from "../useBaseUploader";

export type UseCreateBillingProfileBody = components["schemas"]["BillingProfileRequest"];
export type UseCreateBillingProfileResponse = components["schemas"]["BillingProfileResponse"];
export type UseUpdatePayoutSettingsBody = components["schemas"]["BillingProfilePayoutInfoRequest"];
export type UseUpdatePayoutSettingsResponse = components["schemas"]["BillingProfilePayoutInfoResponse"];

const useCreateBillingProfile = ({
  options = {},
}: UseMutationProps<UseCreateBillingProfileResponse, unknown, UseCreateBillingProfileBody>) => {
  return useBaseMutation<UseCreateBillingProfileBody, UseCreateBillingProfileResponse>({
    resourcePath: BILLING_PROFILES_PATH.ROOT,
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
    resourcePath: BILLING_PROFILES_PATH.PAYOUT(params?.id || ""),
    invalidatesTags: [{ queryKey: MeApi.tags.all, exact: false }],
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
      { queryKey: MeApi.tags.rewarded_pending_invoice(), exact: false },
      { queryKey: MeApi.tags.rewards(), exact: false },
    ],
    method: "POST",
    ...options,
  });
};

export type UseAcceptInvoiceMandateBody = components["schemas"]["InvoiceMandateRequest"];

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

export default {
  useCreateBillingProfile,
  useUpdatePayoutSettings,
  useUploadInvoice,
  useAcceptInvoiceMandate,
};
