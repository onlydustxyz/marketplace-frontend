import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";
import { BILLING_PROFILES_PATH } from "src/api/BillingProfiles/path";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";

import { QueryParams } from "../../utils/getEndpointUrl";
import { UseInfiniteBaseQueryProps, useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { BILLING_PROFILES_TAGS } from "./tags";

export type UseGetBillingProfileById = components["schemas"]["BillingProfileResponse"];
export type UseGetBillingProfilePayout = components["schemas"]["BillingProfilePayoutInfoResponse"];
export type UseGetBillingProfiles = components["schemas"]["MyBillingProfilesResponse"];

const useGetBillingProfileById = ({
  options = {},
  params,
}: UseQueryProps<UseGetBillingProfileById, { id?: string }>) => {
  return useBaseQuery<UseGetBillingProfileById>({
    resourcePath: BILLING_PROFILES_PATH.byId(params?.id || ""),
    tags: BILLING_PROFILES_TAGS.all,
    ...options,
  });
};

const useBillingProfiles = ({ options = {} }: UseQueryProps<UseGetBillingProfiles>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseGetBillingProfiles>({
    resourcePath: BILLING_PROFILES_PATH.meBillingProfiles,
    tags: BILLING_PROFILES_TAGS.me,
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

const useGetPayoutInfo = ({ options = {}, params }: UseQueryProps<UseGetBillingProfilePayout, { id?: string }>) => {
  return useBaseQuery<UseGetBillingProfilePayout>({
    resourcePath: BILLING_PROFILES_PATH.payout(params?.id || ""),
    tags: BILLING_PROFILES_TAGS.all,
    ...options,
  });
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
      resourcePath: BILLING_PROFILES_PATH.invoicesLinkedToProfil(params?.billingProfileId ?? ""),
      tags: BILLING_PROFILES_TAGS.invoices_linked_to_profile(params?.billingProfileId ?? ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 6,
    },
    { ...options, enabled: !!params?.billingProfileId && isAuthenticated }
  );
};

export type UseDownloadBillingProfileInvoiceResponse = components["schemas"]["ResourceRes"];

const useDownloadBillingProfileInvoice = ({
  params,
  options = {},
}: UseQueryProps<UseDownloadBillingProfileInvoiceResponse, { billingProfileId: string; invoiceId: string }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseDownloadBillingProfileInvoiceResponse>({
    resourcePath: BILLING_PROFILES_PATH.downloadInvoiceLinkedToProfil(
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

export default {
  useBillingProfiles,
  useGetPayoutInfo,
  useGetBillingProfileById,
  useBillingProfileInvoices,
  useDownloadBillingProfileInvoice,
};
