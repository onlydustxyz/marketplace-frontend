import { components } from "src/__generated/api";
import { SponsorPaths } from "src/api/Sponsors/paths";
import { SPONSORS_TAGS } from "src/api/Sponsors/tags";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { UseInfiniteBaseQueryProps, useInfiniteBaseQuery } from "src/api/useInfiniteBaseQuery";
import { QueryParams } from "src/utils/getEndpointUrl";

type UseGetSponsorByIdResponse = components["schemas"]["SponsorDetailsResponse"];

const useGetSponsorById = ({
  params,
  options = {},
}: UseQueryProps<UseGetSponsorByIdResponse, { sponsorId?: string }>) => {
  return useBaseQuery<UseGetSponsorByIdResponse>({
    resourcePath: SponsorPaths.SPONSOR_BY_ID(params?.sponsorId ?? ""),
    enabled: !!params?.sponsorId,
    tags: SPONSORS_TAGS.detail_by_id(params?.sponsorId ?? ""),
    ...options,
  });
};

type UseGetSponsorTransactionsResponse = components["schemas"]["TransactionHistoryPageResponse"];

interface SponsorTransactionsParams {
  sponsorId: string;
  queryParams?: QueryParams;
  pageSize?: number;
}

const useGetSponsorTransactions = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<UseGetSponsorTransactionsResponse, SponsorTransactionsParams>) => {
  return useInfiniteBaseQuery<UseGetSponsorTransactionsResponse>(
    {
      resourcePath: SponsorPaths.SPONSOR_TRANSACTIONS(params?.sponsorId || ""),
      tags: SPONSORS_TAGS.transactions(),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 10,
    },
    options
  );
};

export default {
  useGetSponsorById,
  useGetSponsorTransactions,
};
