import { UseMutationProps, useBaseMutation } from "src/api/useBaseMutation";
import { SAMPLE_SUB_TAGS } from "./tags";
import { API_PATH } from "src/api/ApiPath";

const useCreateProjectRewardMutation = ({
  params,
  options,
}: UseMutationProps<{ sample: string }, { projectId?: string }, unknown>) => {
  return useBaseMutation<unknown, { sample: string }>({
    resourcePath: API_PATH.SAMPLES,
    method: "POST",
    enabled: !!params?.projectId,
    invalidatesTags: [{ queryKey: SAMPLE_SUB_TAGS.all, exact: true }],
    ...options,
  });
};

export default { useCreateProjectRewardMutation };
