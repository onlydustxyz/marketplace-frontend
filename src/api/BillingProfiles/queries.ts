import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";
import { BILLING_PROFILES_PATH } from "src/api/BillingProfiles/path";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { QueryParams } from "src/utils/getEndpointUrl";

import { UseInfiniteBaseQueryProps, useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { BILLING_PROFILES_TAGS } from "./tags";

export type UseGetBillingProfileById = components["schemas"]["BillingProfileResponse"];
export type UseGetBillingProfilePayout = components["schemas"]["BillingProfilePayoutInfoResponse"];
export type UseGetBillingProfiles = components["schemas"]["MyBillingProfilesResponse"];
export type UseGetBillingCoworkers = components["schemas"]["BillingProfileCoworkersPageResponse"];
export type UseGetBillingProfileInvoiceableRewardsResponse =
  components["schemas"]["BillingProfileInvoiceableRewardsResponse"];

const useGetBillingProfileById = ({
  options = {},
  params,
}: UseQueryProps<UseGetBillingProfileById, { id?: string }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseGetBillingProfileById>({
    resourcePath: BILLING_PROFILES_PATH.BY_ID(params?.id || ""),
    tags: BILLING_PROFILES_TAGS.single(params?.id || ""),
    ...options,
    enabled: !!params?.id && isAuthenticated,
  });
};

const useGetPayoutInfo = ({ options = {}, params }: UseQueryProps<UseGetBillingProfilePayout, { id?: string }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseGetBillingProfilePayout>({
    resourcePath: BILLING_PROFILES_PATH.PAYOUT(params?.id || ""),
    tags: BILLING_PROFILES_TAGS.billing_profile_payment_methods(params?.id || ""),
    ...options,
    enabled: !!params?.id && isAuthenticated,
  });
};
interface BillingProfileCoworkersParams {
  billingProfileId: string;
  queryParams?: QueryParams;
  pageSize?: number;
}

const useGetBillingProfileCoworkers = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<UseGetBillingCoworkers, BillingProfileCoworkersParams>) => {
  const { isAuthenticated } = useAuth0();
  return useInfiniteBaseQuery<UseGetBillingCoworkers>(
    {
      resourcePath: BILLING_PROFILES_PATH.COWORKERS(params?.billingProfileId ?? ""),
      tags: BILLING_PROFILES_TAGS.billing_profile_coworkers(params?.billingProfileId ?? ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 6,
    },
    { ...options, enabled: !!params?.billingProfileId && isAuthenticated }
  );
};

export type UseBillingProfileInvoicesResponse = components["schemas"]["BillingProfileInvoicesPageResponse"];

interface BillingProfileInvoicesParams {
  billingProfileId: string;
  queryParams?: QueryParams;
  pageSize?: number;
}

const useBillingProfileInvoices = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<UseBillingProfileInvoicesResponse, BillingProfileInvoicesParams>) => {
  const { isAuthenticated } = useAuth0();
  return useInfiniteBaseQuery<UseBillingProfileInvoicesResponse>(
    {
      resourcePath: BILLING_PROFILES_PATH.INVOICE_LINKED_TO_PROFILE(params?.billingProfileId ?? ""),
      tags: BILLING_PROFILES_TAGS.invoices_linked_to_profile(params?.billingProfileId ?? ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 6,
    },
    { ...options, enabled: !!params?.billingProfileId && isAuthenticated }
  );
};

export type UseDownloadBillingProfileInvoiceResponse = Blob;

const useDownloadBillingProfileInvoice = ({
  params,
  options = {},
}: UseQueryProps<UseDownloadBillingProfileInvoiceResponse, { billingProfileId: string; invoiceId: string }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseDownloadBillingProfileInvoiceResponse>({
    resourcePath: BILLING_PROFILES_PATH.DOWNLOAD_INVOICE_LINKED_TO_PROFILE(
      params?.billingProfileId ?? "",
      params?.invoiceId ?? ""
    ),
    enabled: !!params?.billingProfileId && !!params?.invoiceId && isAuthenticated,
    tags: BILLING_PROFILES_TAGS.download_invoices_linked_to_profile(
      params?.billingProfileId ?? "",
      params?.invoiceId ?? ""
    ),
    ...options,
  });
};

const useGetBillingProfileInvoiceableRewards = ({
  options = {},
  params,
}: UseQueryProps<UseGetBillingProfileInvoiceableRewardsResponse, { billingProfileId?: string }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseGetBillingProfileInvoiceableRewardsResponse>({
    resourcePath: BILLING_PROFILES_PATH.INVOICEABLE_REWARDS(params?.billingProfileId || ""),
    tags: BILLING_PROFILES_TAGS.invoiceable_rewards(params?.billingProfileId || ""),
    ...options,
    enabled: !!params?.billingProfileId && isAuthenticated,
  });
};

export default {
  useGetPayoutInfo,
  useGetBillingProfileById,
  useBillingProfileInvoices,
  useDownloadBillingProfileInvoice,
  useGetBillingProfileCoworkers,
  useGetBillingProfileInvoiceableRewards,
};
