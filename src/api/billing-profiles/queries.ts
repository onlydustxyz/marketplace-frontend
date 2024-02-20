import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import { BILLING_PROFILES_TAGS } from "src/api/billing-profiles/tags";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { UseInfiniteBaseQueryProps, useInfiniteBaseQuery } from "src/api/useInfiniteBaseQuery";
import { QueryParams } from "src/utils/getEndpointUrl";

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
      resourcePath: API_PATH.INVOICES_LINKED_TO_PROFILE(params?.billingProfileId ?? ""),
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
    resourcePath: API_PATH.DOWNLOAD_INVOICE_LINKED_TO_PROFILE(params?.billingProfileId ?? "", params?.invoiceId ?? ""),
    enabled: !!params?.billingProfileId && !!params?.invoiceId && isAuthenticated,
    tags: BILLING_PROFILES_TAGS.download_invoices_linked_to_profile(
      params?.billingProfileId ?? "",
      params?.invoiceId ?? ""
    ),
    ...options,
  });
};

export default { useBillingProfileInvoices, useDownloadBillingProfileInvoice };
