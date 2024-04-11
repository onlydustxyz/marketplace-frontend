import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import { SPONSORS_TAGS } from "src/api/Sponsors/tags";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";

type UseGetSponsorByIdResponse = components["schemas"]["SponsorDetailsResponse"];

const useGetSponsorById = ({
  params,
  options = {},
}: UseQueryProps<UseGetSponsorByIdResponse, { sponsorId?: string }>) => {
  return useBaseQuery<UseGetSponsorByIdResponse>({
    resourcePath: API_PATH.SPONSOR_BY_ID(params?.sponsorId ?? ""),
    enabled: !!params?.sponsorId,
    tags: SPONSORS_TAGS.detail_by_id(params?.sponsorId ?? ""),
    ...options,
  });
};

export default {
  useGetSponsorById,
};
