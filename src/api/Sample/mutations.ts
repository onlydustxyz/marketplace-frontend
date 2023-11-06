import { UseMutationProps, useBaseMutation } from "src/api/useBaseMutation";
import { SAMPLE_TAGS } from "./tags";
import { API_PATH } from "src/api/ApiPath";

const useCreateProjectRewardMutation = ({
  params,
  options,
}: UseMutationProps<{ sample: string }, { projectId?: string }, unknown>) => {
  return useBaseMutation<unknown, { sample: string }>({
    resourcePath: API_PATH.SAMPLE_BY_ID(params?.projectId || ""),
    pathParam: params?.projectId,
    method: "POST",
    enabled: !!params?.projectId,
    invalidatesTags: [{ queryKey: SAMPLE_TAGS.project(params?.projectId || ""), exact: true }],
    ...(options || {}),
  });
};

export default { useCreateProjectRewardMutation };
