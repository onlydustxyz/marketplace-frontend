import { components } from "src/__generated/api";
import { SPONSOR_PATHS } from "src/api/Sponsors/paths";
import { SPONSORS_TAGS } from "src/api/Sponsors/tags";
import { UseMutationProps, useBaseMutation } from "src/api/useBaseMutation";

export type UseAllocateBudget = components["schemas"]["AllocateRequest"];
const useAllocateBudget = ({ options = {}, params }: UseMutationProps<unknown, { sponsorId?: string }>) => {
  return useBaseMutation<UseAllocateBudget, unknown>({
    resourcePath: SPONSOR_PATHS.SPONSOR_ALLOCATION(params?.sponsorId || ""),
    method: "POST",
    enabled: !!params?.sponsorId,
    invalidatesTags: [
      { queryKey: SPONSORS_TAGS.detail_by_id(params?.sponsorId || ""), exact: false },
      { queryKey: SPONSORS_TAGS.transactions(), exact: false },
    ],
    ...options,
  });
};
export default {
  useAllocateBudget,
};
