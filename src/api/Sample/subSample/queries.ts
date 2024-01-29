import { API_PATH } from "src/api/ApiPath";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";

import { SAMPLE_SUB_TAGS } from "./tags";

const useSubSampleByIdQuery = ({ params, options = {} }: UseQueryProps<{ sample: string }, { rewardId?: string }>) => {
  return useBaseQuery<{ sample: string }>({
    resourcePath: API_PATH.SAMPLES,
    enabled: !!params?.rewardId,
    tags: SAMPLE_SUB_TAGS.all,
    ...options,
  });
};

export default { useSubSampleByIdQuery };
